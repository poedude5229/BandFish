from .db import db, environment, SCHEMA, add_prefix_for_prod

class AlbumPodcast(db.Model):
    __tablename__ = 'albums_podcasts'

    if environment == 'production':
        __table_args__ = {'schema':SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    artist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    album_art = db.Column(db.String(255))
    # artist_name = db.Column(db.String(255))
    type = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Numeric(10,2), nullable=False)
    genre = db.Column(db.String(50))

    songs_episodes = db.relationship('SongEpisode', back_populates='albums_podcasts')
    user_owns = db.relationship('UserOwns', back_populates='album_podcast', cascade='all, delete-orphan')
    reviews = db.relationship('Review', back_populates='album_podcast', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'artist_id': self.artist_id,
            'name': self.name,
            'album_art': self.album_art,
            # 'artist_name': self.artist_name,
            'type': self.type,
            'price': self.price,
            'genre': self.genre
        }
