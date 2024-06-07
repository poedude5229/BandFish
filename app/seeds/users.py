from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    mfdoom = User(
         firstname="MF", lastname="DOOM", username='MFDOOM', email='mfdoom@dumile.io', password='password', role="Artist", profile_pic="https://i.scdn.co/image/ab67616d00001e026ce90ec627a0198a8efd127f", profile_banner="https://bandfishbucket.s3.amazonaws.com/mfdoombanner.jpg")
    armchris = User(
        firstname="Armand", lastname="Christophe", username='achristophe', email='armchris@aa.io', password='password', role="User", profile_pic="https://bandfishbucket.s3.amazonaws.com/outlook.png", profile_banner="https://bandfishbucket.s3.amazonaws.com/NRG95Bridge95startrails95FINAL.JPG" )
    jeremy = User(
        firstname="Pearl", lastname="Jam", username='PearlJam', email='pearljam@aa.io', password='password', role="Artist", profile_pic="https://bandfishbucket.s3.amazonaws.com/pearljam.png", profile_banner="https://bandfishbucket.s3.amazonaws.com/pearljambanner.jpg")
    slightystoopid = User(
        firstname="Slightly", lastname="Stoopid", username="closertothesun", email="2am@email.com", password="colli3m4n", role="Artist", profile_pic="https://bandfishbucket.s3.amazonaws.com/slightlystoopid.png", profile_banner="https://bandfishbucket.s3.amazonaws.com/slightlystoopidbanner.jpg")
    sublime = User(
        firstname="Sublime", lastname="", username="Sublime", email="sublime@sublime.com", password="sublime", role="Artist", profile_pic="https://bandfishbucket.s3.amazonaws.com/Sublime_Self-Titled.jpg", profile_banner="https://bandfishbucket.s3.amazonaws.com/sublimebanner.jpg")
    lpn = User(
        firstname="The Last Podcast", lastname="Network", username="LastPodcastNetwork", email="sidestorieslpotl@gmail.com", password="ham-man", role="Artist", profile_pic="https://bandfishbucket.s3.amazonaws.com/lpn.jpg", profile_banner="https://bandfishbucket.s3.amazonaws.com/lpnbanner.jpg"
    )
    aic = User(
        firstname="Alice in", lastname="Chains", username="aliceinchains", email="aic@hatetofeel.com", password="nothingsong", role="Artist", profile_pic="https://bandfishbucket.s3.amazonaws.com/aic.jpg", profile_banner="https://bandfishbucket.s3.amazonaws.com/aicbanner.jpg"
    )
    ff = User(
        firstname="Foo", lastname="Fighters", username="foofighters", email="dgrohl@foofighters.com", password="learntofly", role="Artist", profile_pic="https://bandfishbucket.s3.amazonaws.com/ff.png", profile_banner="https://bandfishbucket.s3.amazonaws.com/ffbanner.jpg"
    )
    aholowka = User(
        firstname="Alec", lastname="Holowka", username="aholowka", email="aholowka@finji.co", password="nightmareyes", role="Artist", profile_pic="https://bandfishbucket.s3.amazonaws.com/aholowka.jpg", profile_banner="https://bandfishbucket.s3.amazonaws.com/aholowkabanner.jpg"
    )
    pepper = User(
        firstname="Pepper", lastname="", username="Pepper", email="stonelove@no1.sound", password="nop3rmission", role="Artist", profile_pic="https://bandfishbucket.s3.amazonaws.com/pepper.jpg", profile_banner="https://bandfishbucket.s3.amazonaws.com/Warpedtourpepper.jpg"
    )
    joe = User(
        firstname="Joe", lastname="Mama", username="joemama", profile_pic="https://avatars.githubusercontent.com/u/148486236?v=4", profile_banner="https://bandfishbucket.s3.amazonaws.com/NRG95Bridge95startrails95FINAL.JPG", email="joemama@bababooey.com", password="nikitaBURGER", role="User"
    )
    kned = User(
        firstname="Katniss", lastname="Everdeen", username="katnisseverdeen", email="katnisseverdeen@bababooey.com", password="mockingjay555", role="User"
    )
    bw = User(
        firstname="Bruce", lastname="Wayne", username="brucewayne", email="brucewayne@bababooey.com", password="darkknight456", role="User"
    )
    fb = User(
        firstname="Frodo", lastname="Baggins", username="frodobaggins", email="frodobaggins@bababooey.com", password="onering111", role="User"
    )
    ij = User(
        firstname="Indiana", lastname="Jones", username="indianajones", email="indianajones@bababooey.com", password="raiders333", role="User", profile_pic="https://bandfishbucket.s3.amazonaws.com/1c69f339e921465fb528ef78a5f87e76.jpg", profile_banner="https://bandfishbucket.s3.amazonaws.com/indianajonesbanner.jpg"
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
    db.session.add(joe)
    db.session.add(kned)
    db.session.add(bw)
    db.session.add(fb)
    db.session.add(ij)
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
