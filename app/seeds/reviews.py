from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    r1 = Review(
        user_id=11, item_id=1, title="I LOVE THIS POD", body="This podcast has been my absolute favorite for going on 6 years. Was better with Ben Kissel though."
    )
    r2 = Review(
        user_id=11, item_id=2, title="EVEN FLOW!!!!", body="Thoughts arrive like butterflies 🤯 This album is so good."
    )
    r3 = Review(
        user_id=11, item_id=3, title="I like to listen to this when I'm down in a hole", body="I ate a whole jar of flies while I listened to this album."
    )
    r4 = Review(
        user_id=11, item_id=4, title="Tripod moment", body="This review was brought to you by a 3-legged dog. Let me sleep so my teeth won't grind"
    )
    r5 = Review(
        user_id=11, item_id=5, title="I don't hate to feel this album", body="The guitar tone on this whole masterpiece album is so dirt-y haha. I love burning on the angry chair"
    )
    r6 = Review(
        user_id=11, item_id=6, title="PEARL JAM!", body="I guess you could say these tracks make me feel 'Alive'"
    )
    r7 = Review(
        user_id=11, item_id=7, title="Give me some rope", body="Walk is the best track on here"
    )
    r8 = Review(
        user_id=11, item_id=8, title="I learned to fly from this album", body="The Foo Fighters weren't monkeying around when they made this"
    )
    r9 = Review(
        user_id=11, item_id=9, title="I don't have to wait for my Ruca anymore", body="This music is priceless, timeless and placeless but still so representative of the LBC. Greatest album of all time"
    )
    r9a = Review(
        user_id=12, item_id=9, title="So good", body="Badfish is my favorite track"
    )
    r9b = Review(
        user_id=13, item_id=9, title="The best Bradley", body="Very chillaxing."
    )
    r10 = Review(
        user_id=14, item_id=10, title="What I Got is iconic", body="Every track on here is a banger"
    )
    r10a = Review(
        user_id=11, item_id=10, title="Jailhouse keeps empty", body="Life is too short so listen to this album and love what you've got"
    )
    r11 = Review(
        user_id=11, item_id=11, title="So touching", body="Hearing Bradley's voice again and his son carrying on the band's legacy is enough to make a grown man cry"
    )
    r11a = Review(
        user_id=14, item_id=11, title="NEW SUBLIMEEE?", body="This song is fantastic, Sublime is back"
    )
    r12 = Review(
        user_id=11, item_id=12, title="GENTLEMEN!!!!", body="R.I.P. KB, Fly High Bird Luger. Funniest podcast ever"
    )
    r12a = Review(
        user_id=13, item_id=12, title="Jackie is too funny", body="Good old LPN days, miss Ben on the network"
    )
    r13a = Review(
        user_id=14, item_id=13, title="I get a kick outta brew", body="DOOM is a genius"
    )
    r13b = Review(
        user_id=13, item_id=13, title="Rapp Snitches", body="Tellin all they business! Sit in the court and be a star witness to this album"
    )
    r14a = Review(
        user_id=11, item_id=14, title="DOOM GOAT", body="I've washed so many dishes while listening to this album"
    )
    r14b = Review(
        user_id=15, item_id=14, title="TikTok brought me here", body="I only listen to music if tiktok tells me it's popular. Sending Madvillain to China"
    )
    r15 = Review(
        user_id=12, item_id=15, title="I just remembered ALL CAPS", body="You too should remember all caps when you spell the man name"
    )
    r16 = Review(
        user_id=11, item_id=16, title="Volume 1 is the best part of the soundtrack", body="Alec Holowka was in his bag when he made this. NITW is the best game fr"
    )
    r16a = Review(
        user_id=12, item_id=16, title="R.I.P. Alec Holowka", body="I got cups on my ears, but I still love listening to NITW soundtrack"
    )
    r17 = Review(
        user_id=13, item_id=17, title="This game is so cozy partly thanks to the soundtrack", body="Thryy Wyrd Tyyns is a halloween bop"
    )
    r18 = Review(
        user_id=11, item_id=18, title="Pepper is awesome Cali Reggae", body="When I'm in that sublime mood, Pepper goes great with it. These guys are so iconic for their sound"
    )
    r19 = Review(
        user_id=12, item_id=19, title="2AM is the best song ever", body="So chillaxing, these guys stepped in when we were missing Sublime"
    )
    r19a = Review(
        user_id=11, item_id=19, title="Trumpets on 2AM go crazy", body="I was diagnosed with Chronchitis, I have to listen to chill Cali Reggae and dub every day"
    )
    r20 = Review(
        user_id=13, item_id=20, title="Underrated album for sure", body="All we need is good Slightly Stoopid to rule our brains, only one thing sets us free"
    )

    db.session.add(r1)
    db.session.add(r2)
    db.session.add(r3)
    db.session.add(r4)
    db.session.add(r5)
    db.session.add(r6)
    db.session.add(r7)
    db.session.add(r8)
    db.session.add(r9)
    db.session.add(r9a)
    db.session.add(r9b)
    db.session.add(r10)
    db.session.add(r10a)
    db.session.add(r11)
    db.session.add(r11a)
    db.session.add(r12)
    db.session.add(r12a)
    db.session.add(r13a)
    db.session.add(r13b)
    db.session.add(r14a)
    db.sesion.add(r14b)
    db.session.add(r15)
    db.session.add(r16)
    db.session.add(r16a)
    db.session.add(r17)
    db.session.add(r18)
    db.session.add(r19)
    db.session.add(r19a)
    db.session.add(r20)
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))
