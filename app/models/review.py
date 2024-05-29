from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
class Review(db.Model):
    __tablename__ = "reviews"

    if environment == "production":
        __table_args__ = {'schema':SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    item_id = db.Column(db.Integer)
    title = db.Column(db.String(30))
    body = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'item_id': self.item_id,
            'title': self.title,
            'body': self.body
        }
