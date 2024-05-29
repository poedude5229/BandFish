from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

# Join table for User and AlbumPodcast


# Join table for User and SongEpisode
# I think this is optional, I might have this so a user can just own the songs if they buy an album
# user_song_episode = db.Table('user_song_episode',
#     db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
#     db.Column('song_episode_id', db.Integer, db.ForeignKey('song_episode.id'), primary_key=True)
# )


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(25), nullable=False)
    lastname = db.Column(db.String(25), nullable=False)
    username = db.Column(db.String(25), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    profile_pic = db.Column(db.String(255))
    profile_banner = db.Column(db.String(255))
    role = db.Column(db.String(15))
    hashed_password = db.Column(db.String(255), nullable=False)

    reviews = db.relationship('Review', back_populates='user', cascade='all, delete-orphan')
    user_owns = db.relationship('UserOwns', back_populates='user', cascade='all, delete-orphan')
    # albums_podcasts = db.relationship('Album')
    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'firstname': self.firstname,
            'lastname': self.lastname,
            'username': self.username,
            'email': self.email,
            'profile_pic': self.profile_pic,
            'profile_banner': self.profile_banner,
            'role': self.role
        }
