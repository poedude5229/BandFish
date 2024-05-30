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
        artist_id=3, album_id=2, title="Black", source="", duration="5:44"
    )
    evenflow = SongEpisode(
        artist_id=3, album_id=2, title="Even Flow", source="", duration="4:54"
    )
    jeremy = SongEpisode(
        artist_id=3, album_id=2, title="Even Flow", source="", duration="5:19"
    )
    beefrapp = SongEpisode(
        artist_id=1, album_id=13, title="Beef Rapp", source="", duration="4:40"
    )
    onebeer = SongEpisode(
        artist_id=1, album_id=13, title="One Beer", source="", duration="4:20"
    )
    rsk = SongEpisode(
        artist_id=1, album_id=13, title="Rapp Snitch Knishes (Ft. Mr. Fantastik)", source="", duration="2:53"
    )
    dday = SongEpisode(
        artist_id=1, album_id=14, title="Doomsday", source="", duration="4:58"
    )
    rld = SongEpisode(
        artist_id=1, album_id=14, title="Rhymes Like Dimes (Ft. DJ Cucumber Slice)", source="", duration="4:20"
    )
    wytia = SongEpisode(
        artist_id=1, album_id=14, title="Who You Think I Am? (Ft. King Caesar, Rodan, Megalon, K.D., King Geedorah & Kong)", source="", duration="3:24"
    )
    rooster = SongEpisode(
        artist_id=7, album_id=5, title="Rooster", source="", duration="6:15"
    )
    would = SongEpisode(
        artist_id=7, album_id=5, title="Would?", source="", duration="3:28"
    )
    rwid = SongEpisode(
        artist_id=7, album_id=5, title="Rain When I Die", source="", duration="6:02"
    )
    grind = SongEpisode(
        artist_id=7, album_id=4, title="Grind", source="", duration="4:46"
    )
    godam = SongEpisode(
        artist_id=7, album_id=4, title="God Am", source="", duration="4:08"
    )
    hby = SongEpisode(
        artist_id=7, album_id=4, title="Heaven Beside You", source="", duration="5:28"
    )
    frogs = SongEpisode(
        artist_id=7, album_id=4, title="Frogs", source="", duration="8:18"
    )
    rottenapple = SongEpisode(
        artist_id=7, album_id=3, title="Rotten Apple", source="", duration="6:59"
    )
    nutshell = SongEpisode(
        artist_id=7, album_id=3, title="Nutshell", source="", duration="4:20"
    )
    istayaway = SongEpisode(
        artist_id=7, album_id=3, title="I Stay Away", source="", duration="4:14"
    )
    alive = SongEpisode(
        artist_id=3, album_id=6, title="Alive", source="", duration="5:42"
    )
    rope = SongEpisode(
        artist_id=8, album_id=7, title="Rope", source="", duration="4:20"
    )
    walk = SongEpisode(
        artist_id=8, album_id=7, title="Walk", source="", duration="4:16"
    )
    everlong = SongEpisode(
        artist_id=8, album_id=8, title="Everlong", source="", duration="4:10"
    )
    mkw = SongEpisode(
        artist_id=8, album_id=8, title="Monkey Wrench", source="", duration="3:54"
    )
    myhero = SongEpisode(
        artist_id=8, album_id=8, title="My Hero", source="", duration="4:20"
    )
    fotf = SongEpisode(
        artist_id=5, album_id=9, title="40oz. to Freedom", source="", duration="3:02"
    )
    dontpush = SongEpisode(
        artist_id=5, album_id=9, title="Don't Push", source="", duration="4:20"
    )
    badfish = SongEpisode(
        artist_id=5, album_id=9, title="Badfish", source="", duration="3:05"
    )
    wogdfoa = SongEpisode(
        artist_id=5, album_id=9, title="We're Only Gonna Die for Our Arrogance", source="", duration="3:28"
    )
