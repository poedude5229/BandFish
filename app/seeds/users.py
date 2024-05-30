from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
         firstname="Bob", lastname="Saget", username='Demo', email='demo@aa.io', password='password', role="User")
    armchris = User(
        firstname="Armand", lastname="Christophe", username='achristophe', email='armchris@aa.io', password='password', role="User")
    jeremy = User(
        firstname="Pearl", lastname="Jam", username='PearlJam', email='pearljam@aa.io', password='password', role="Artist")
    daphne = User(
        firstname="Daphne", lastname="Stone", username="BigD420", email="bigd420@email.com", password="daphne", role="User")
    sublime = User(
        firstname="Sublime", lastname="", username="Sublime", email="sublime@sublime.com", password="sublime", role="Artist")
    lpotl = User(
        firstname="The Last Podcast", lastname="on the Left", username="LPOTL", email="sidestorieslpotl@gmail.com", password="ham-man", role="Artist"
    )

    db.session.add(demo)
    db.session.add(armchris)
    db.session.add(jeremy)
    db.session.add(daphne)
    db.session.add(sublime)
    db.session.add(lpotl)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
