from .db import db, environment, SCHEMA, add_prefix_for_prod

class Wishlist(db.Model):
    __tablename__ = 'wishlists'
    if environment == 'production':
        __table_args__ = {'schema':SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('albums_podcasts.id')), nullable=False)

    user = db.relationship('User', back_populates='wishlists')
    album_podcast = db.relationship('AlbumPodcast', back_populates='wishlists')

    def to_dict(self):
        return {
            "id": self.id,
            'user_id': self.user_id,
            "product_id": self.product_id
        }
