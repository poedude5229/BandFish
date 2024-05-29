from .db import db, environment, SCHEMA, add_prefix_for_prod

# user_owns = db.Table('user_owns',
#     db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
#     db.Column('album_podcast_id', db.Integer, db.ForeignKey('albums_podcasts.id'), primary_key=True)
# )

class UserOwns(db.Model):
    __tablename__ = 'user_owns'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    album_podcast_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('albums_podcasts.id')), nullable=False)

    user = db.relationship('User', back_populates='user_owns')
    album_podcast = db.relationship("AlbumPodcast", back_populates='user_owns')


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'album_podcast_id': self.album_podcast_id
        }
