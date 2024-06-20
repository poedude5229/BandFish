from app.models import db, Wishlist, environment, SCHEMA
from sqlalchemy.sql import text

def seed_wishlists():
    user15w1 = Wishlist(user_id=15, product_id=1)
    user15w2 = Wishlist(user_id=15, product_id=11)
    user15w3 = Wishlist(user_id=15, product_id=19)


    db.session.add(user15w1)
    db.session.add(user15w2)
    db.session.add(user15w3)
    db.session.commit()

def undo_wishlists():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.wishlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM wishlists"))
    db.session.commit()
