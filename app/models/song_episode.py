from .db import db, environment, SCHEMA, add_prefix_for_prod

class SongEpisode(db.Model):
    __tablename__ = 'songs_episodes'


    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    artist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('user.id')), nullable=False)
    album_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('albums_podcasts.id')), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    source = db.Column(db.String(255))
    duration = db.Column(db.Time)

    album_podcast = db.relationship('AlbumPodcast', back_populates='song_episode')

    def to_dict(self):
        duration_str = f'{self.duration.hour}:{self.duration.minute}' if self.duration else f'{0}:{00}'
        return {
            'id': self.id,
            'artist_id': self.artist_id,
            'album_id': self.album_id,
            'title': self.title,
            'source': self.source,
            'duration': duration_str
        }
