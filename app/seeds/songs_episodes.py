from app.models import db, SongEpisode, environment, SCHEMA
from sqlalchemy.sql import text

# Adds sample music, here I should use AWS links for source attribute
# example:
# this = SongEpisode(artist_id=integer, album_id=integer, title="String", source="aws bucket object url", duration: "1:23:45")
#                                                                                                                    h  m  s


def seed_songs():
    lpotl_ep_331 = SongEpisode(
        artist_id=6, album_id=1, title="Episode 331: The Donner Party Part I - Salt of the Earth", source="https://bandfishbucket.s3.amazonaws.com/Episode+331_+The+Donner+Party+Part+I.mp3", duration="1:29:44"
    )
    lpotl_ep_332 = SongEpisode(
        artist_id=6, album_id=1, title="Episode 332: The Donner Party Part II - The Forlorn Hope", source="https://bandfishbucket.s3.amazonaws.com/Episode+332_+The+Donner+Party+Part+I.mp3", duration="1:48:24"
    )
    black = SongEpisode(
        artist_id=3, album_id=2, title="Black", source="https://bandfishbucket.s3.amazonaws.com/05.+Black.mp3", duration="5:44"
    )
    evenflow = SongEpisode(
        artist_id=3, album_id=2, title="Even Flow", source="https://bandfishbucket.s3.amazonaws.com/02.+Even+Flow.mp3", duration="4:54"
    )
    jeremy = SongEpisode(
        artist_id=3, album_id=2, title="Jeremy", source="https://bandfishbucket.s3.amazonaws.com/06.+Jeremy.mp3", duration="5:19"
    )
    beefrapp = SongEpisode(
        artist_id=1, album_id=12, title="Beef Rapp", source="https://bandfishbucket.s3.amazonaws.com/01-Beef+Rapp.mp3", duration="4:40"
    )
    onebeer = SongEpisode(
        artist_id=1, album_id=12, title="One Beer", source="https://bandfishbucket.s3.amazonaws.com/04-One+Beer.mp3", duration="4:20"
    )
    rsk = SongEpisode(
        artist_id=1, album_id=12, title="Rapp Snitch Knishes (Ft. Mr. Fantastik)", source="https://bandfishbucket.s3.amazonaws.com/13-Rapp+Snitch+Knishes+(Ft.+Mr.+Fantastik).mp3", duration="2:53"
    )
    dday = SongEpisode(
        artist_id=1, album_id=13, title="Doomsday (Instrumental)", source="https://bandfishbucket.s3.amazonaws.com/18+-+Doomsday+-+Instrumental.mp3", duration="4:58"
    )
    rld = SongEpisode(
        artist_id=1, album_id=13, title="Rhymes Like Dimes (Ft. DJ Cucumber Slice)", source="https://bandfishbucket.s3.amazonaws.com/03-Rhymes+Like+Dimes+(Ft.+Cucumber+Slice).mp3", duration="4:20"
    )
    wytia = SongEpisode(
        artist_id=1, album_id=13, title="Who You Think I Am? (Ft. King Caesar, Rodan, Megalon, K.D., King Geedorah & Kong)", source="https://bandfishbucket.s3.amazonaws.com/wytia", duration="3:24"
    )
    rooster = SongEpisode(
        artist_id=7, album_id=5, title="Rooster", source="https://bandfishbucket.s3.amazonaws.com/06+Rooster.mp3", duration="6:15"
    )
    would = SongEpisode(
        artist_id=7, album_id=5, title="Would?", source="https://bandfishbucket.s3.amazonaws.com/13+Would_.mp3", duration="3:28"
    )
    rwid = SongEpisode(
        artist_id=7, album_id=5, title="Rain When I Die", source="https://bandfishbucket.s3.amazonaws.com/03+Rain+When+I+Die.mp3", duration="6:02"
    )
    grind = SongEpisode(
        artist_id=7, album_id=4, title="Grind", source="https://bandfishbucket.s3.amazonaws.com/01+Grind.mp3", duration="4:46"
    )
    godam = SongEpisode(
        artist_id=7, album_id=4, title="God Am", source="https://bandfishbucket.s3.amazonaws.com/08+God+Am.mp3", duration="4:08"
    )
    hby = SongEpisode(
        artist_id=7, album_id=4, title="Heaven Beside You", source="https://bandfishbucket.s3.amazonaws.com/04+Heaven+Beside+You.mp3", duration="5:28"
    )
    frogs = SongEpisode(
        artist_id=7, album_id=4, title="Frogs", source="https://bandfishbucket.s3.amazonaws.com/11+Frogs.mp3", duration="8:18"
    )
    rottenapple = SongEpisode(
        artist_id=7, album_id=3, title="Rotten Apple", source="https://bandfishbucket.s3.amazonaws.com/01+Rotten+Apple.mp3", duration="6:59"
    )
    nutshell = SongEpisode(
        artist_id=7, album_id=3, title="Nutshell", source="https://bandfishbucket.s3.amazonaws.com/02+Nutshell.mp3", duration="4:20"
    )
    istayaway = SongEpisode(
        artist_id=7, album_id=3, title="I Stay Away", source="https://bandfishbucket.s3.amazonaws.com/03+I+Stay+Away.mp3", duration="4:14"
    )
    alive = SongEpisode(
        artist_id=3, album_id=6, title="Alive", source="https://bandfishbucket.s3.amazonaws.com/1-02+Alive+(2004+Remix).m4a", duration="5:42"
    )
    rope = SongEpisode(
        artist_id=8, album_id=7, title="Rope", source="https://bandfishbucket.s3.amazonaws.com/Rope.mp3", duration="4:20"
    )
    walk = SongEpisode(
        artist_id=8, album_id=7, title="Walk", source="https://bandfishbucket.s3.amazonaws.com/Walk.mp3", duration="4:16"
    )
    everlong = SongEpisode(
        artist_id=8, album_id=8, title="Everlong", source="https://bandfishbucket.s3.amazonaws.com/03.+Everlong.mp3", duration="4:10"
    )
    mkw = SongEpisode(
        artist_id=8, album_id=8, title="Monkey Wrench", source="https://bandfishbucket.s3.amazonaws.com/08.+Monkey+Wrench.mp3", duration="3:54"
    )
    myhero = SongEpisode(
        artist_id=8, album_id=8, title="My Hero", source="https://bandfishbucket.s3.amazonaws.com/05.+My+Hero.mp3", duration="4:20"
    )
    fotf = SongEpisode(
        artist_id=5, album_id=9, title="40oz. to Freedom", source="https://bandfishbucket.s3.amazonaws.com/03-40oztofreedom.wav", duration="3:02"
    )
    dontpush = SongEpisode(
        artist_id=5, album_id=9, title="Don't Push", source="https://bandfishbucket.s3.amazonaws.com/06-dontpush.wav", duration="4:20"
    )
    badfish = SongEpisode(
        artist_id=5, album_id=9, title="Badfish", source="https://bandfishbucket.s3.amazonaws.com/08-badfish.wav", duration="3:05"
    )
    wogdfoa = SongEpisode(
        artist_id=5, album_id=9, title="We're Only Gonna Die for Our Arrogance", source="https://bandfishbucket.s3.amazonaws.com/05-wereonlygonnadieforourarrogance.wav", duration="3:28"
    )
    jailhouse = SongEpisode(
        artist_id=5, album_id=10, title="Jailhouse", source="https://bandfishbucket.s3.amazonaws.com/Sublime+-+Jailhouse.mp3", duration="4:53"
    )
    whatigot_r = SongEpisode(
        artist_id=5, album_id=10, title="What I Got (Reprise)", source="https://bandfishbucket.s3.amazonaws.com/SublimeWhat+I+Got+Reprise.mp3", duration="3:01"
    )
    dointime = SongEpisode(
        artist_id=5, album_id=10, title="Doin' Time", source="https://bandfishbucket.s3.amazonaws.com/dointime.mp3", duration="4:12"
    )
    feellikethat = SongEpisode(
        artist_id=5, album_id=11, title="Feel Like That (feat. Bradley Nowell)", source="https://bandfishbucket.s3.amazonaws.com/Sublime+X+Stick+Figure++Feel+Like+That+feat+Bradley+Nowell.mp3", duration="4:12"
    )
    allcaps = SongEpisode(
        artist_id=1, album_id=14, title="All Caps", source="https://bandfishbucket.s3.amazonaws.com/Madvillain++All+Caps.mp3", duration="2:14"
    )
    btth = SongEpisode(
        artist_id=9, album_id=15, title="Back to the Holler", source="https://bandfishbucket.s3.amazonaws.com/10+Back+to+the+Holler.mp3", duration="7:37"
    )
    possumsprings = SongEpisode(
        artist_id=9, album_id=15, title="Possum Springs", source="https://bandfishbucket.s3.amazonaws.com/22+Possum+Springs.mp3", duration="5:20"
    )
    maeshouse = SongEpisode(
        artist_id=9, album_id=16, title="Mae's House", source="https://bandfishbucket.s3.amazonaws.com/03+Mae's+House+II.mp3", duration="2:32"
    )
    twt = SongEpisode(
        artist_id=9, album_id=16, title="Thryy Wyrd Tyyns", source="https://bandfishbucket.s3.amazonaws.com/36+Thryy+Wyrd+Tyyns.mp3", duration="5:28"
    )
    stonelove = SongEpisode(
        artist_id=10, album_id=17, title="Stone Love", source="https://bandfishbucket.s3.amazonaws.com/y2mate.com+-+Stone+Love.mp3", duration="4:15"
    )
    hos = SongEpisode(
        artist_id=10, album_id=17, title="Ho's", source="https://bandfishbucket.s3.amazonaws.com/y2mate.com+-+Hos.mp3", duration="3:28"
    )
    twoam = SongEpisode(
        artist_id=4, album_id=18, title="2AM", source="https://bandfishbucket.s3.amazonaws.com/y2mate.com+-+2am.mp3", duration="5:00"
    )
    noco = SongEpisode(
        artist_id=4, album_id=19, title="No Cocaine", source="https://bandfishbucket.s3.amazonaws.com/y2mate.com+-+No+Cocaine.mp3", duration="4:45"
    )
    db.session.add(lpotl_ep_331)
    db.session.add(lpotl_ep_332)
    db.session.add(black)
    db.session.add(evenflow)
    db.session.add(jeremy)
    db.session.add(beefrapp)
    db.session.add(onebeer)
    db.session.add(rsk)
    db.session.add(dday)
    db.session.add(rld)
    db.session.add(wytia)
    db.session.add(rooster)
    db.session.add(would)
    db.session.add(rwid)
    db.session.add(grind)
    db.session.add(godam)
    db.session.add(hby)
    db.session.add(frogs)
    db.session.add(rottenapple)
    db.session.add(nutshell)
    db.session.add(istayaway)
    db.session.add(alive)
    db.session.add(rope)
    db.session.add(walk)
    db.session.add(everlong)
    db.session.add(mkw)
    db.session.add(myhero)
    db.session.add(fotf)
    db.session.add(dontpush)
    db.session.add(badfish)
    db.session.add(wogdfoa)
    db.session.add(jailhouse)
    db.session.add(whatigot_r)
    db.session.add(dointime)
    db.session.add(feellikethat)
    db.session.add(allcaps)
    db.session.add(btth)
    db.session.add(possumsprings)
    db.session.add(maeshouse)
    db.session.add(twt)
    db.session.add(stonelove)
    db.session.add(hos)
    db.session.add(twoam)
    db.session.add(noco)
    db.session.commit()

def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs_episodes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM songs_episodes"))

    db.session.commit()
