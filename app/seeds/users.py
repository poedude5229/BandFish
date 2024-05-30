from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    mfdoom = User(
         firstname="MF", lastname="DOOM", username='MFDOOM', email='mfdoom@dumile.io', password='password', role="Artist")
    armchris = User(
        firstname="Armand", lastname="Christophe", username='achristophe', email='armchris@aa.io', password='password', role="User")
    jeremy = User(
        firstname="Pearl", lastname="Jam", username='PearlJam', email='pearljam@aa.io', password='password', role="Artist")
    slightystoopid = User(
        firstname="Slightly", lastname="Stoopid", username="closertothesun", email="2am@email.com", password="colli3m4n", role="Artist")
    sublime = User(
        firstname="Sublime", lastname="", username="Sublime", email="sublime@sublime.com", password="sublime", role="Artist")
    lpn = User(
        firstname="The Last Podcast", lastname="Network", username="LastPodcastNetwork", email="sidestorieslpotl@gmail.com", password="ham-man", role="Artist"
    )
    aic = User(
        firstname="Alice in", lastname="Chains", username="aliceinchains", email="aic@hatetofeel.com", password="nothingsong"
    )
    ff = User(
        firstname="Foo", lastname="Fighters", username="foofighters", email="dgrohl@foofighters.com", password="learntofly"
    )
    aholowka = User(
        firstname="Alec", lastname="Holowka", username="aholowka", email="aholowka@finji.co", password="nightmareyes"
    )
    pepper = User(
        firstname="Pepper", lastname="", username="Pepper", email="stonelove@no1.sound", password="nop3rmission"
    )

    db.session.add(mfdoom)
    db.session.add(armchris)
    db.session.add(jeremy)
    db.session.add(slightystoopid)
    db.session.add(sublime)
    db.session.add(lpn)
    db.session.add(aic)
    db.session.add(ff)
    db.session.add(aholowka)
    db.session.add(pepper)
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
