from app.models import db, AlbumPodcast, environment, SCHEMA
from sqlalchemy.sql import text

def seed_albums():
    lpotl = AlbumPodcast(
        artist_id=6, name="The Last Podcast on the Left", album_art="https://images.squarespace-cdn.com/content/v1/58d952abbf629acc7be750e4/5c5cb10b-30de-4b4c-ad43-b44bfaa657a6/lpotl+text+only+logo.jpg?format=1500w", type="Podcast", price=5.99, genre="True Crime/Comedy"
    )
    ten = AlbumPodcast(
        artist_id=3, name="Ten", album_art="https://downloads.pearljam.com/img/album-art/0223194507ten.jpg", type="Album", price=9.99, genre="Rock"
    )
    jarofflies = AlbumPodcast(
        artist_id=7, name="Jar of Flies", album_art="https://aliceinchains.com/app/uploads/2018/08/715jk3EdIVL._SY355_.jpg", type="Album", price=9.99, genre="Rock"
    )
    tripod = AlbumPodcast(
        artist_id=7, name="Alice in Chains", album_art="https://bandfishbucket.s3.amazonaws.com/220px-Alice_in_Chains_album.jpg", type="Album", price=11.99, genre="Rock"
    )
    dirt = AlbumPodcast(
        artist_id=7, name="Dirt", album_art="https://aliceinchains.com/app/uploads/2018/08/600x600bf-60.jpg", type="Album", price=11.99, genre="Rock"
    )
    pjgreatesthits = AlbumPodcast(
        artist_id=3, name="rearviewmirror: Greatest Hits 1991-2003", album_art="https://downloads.pearljam.com/img/album-art/1507855634aa4c75bd4383881d9dd3caf2592832bf.jpg", type="Album", price=9.99, genre="Rock"
    )
    wastinglight = AlbumPodcast(
        artist_id=8, name="Wasting Light", album_art="https://m.media-amazon.com/images/I/81bcusKozsL._UF1000,1000_QL80_.jpg", type="Album", price=9.99, genre="Rock"
    )
    colourandshape = AlbumPodcast(
        artist_id=8, name="The Colour and the Shape", album_art="https://m.media-amazon.com/images/I/61ZFtaZZXyL._UF1000,1000_QL80_.jpg", type="Album", price=8.99, genre="Rock"
    )
    fortyoztofreedom = AlbumPodcast(
        artist_id=5, name="40oz. to Freedom", album_art="https://i.scdn.co/image/ab67616d00001e02d77299e3d29f44495cd7fbcb", type="Album", price=12.99, genre="Ska"
    )
    sblime = AlbumPodcast(
        artist_id=5, name="Sublime", album_art="https://i.scdn.co/image/ab67616d00001e028fc4b0dcfb9509553f195c85", type="Album", price=12.99, genre="Ska"
    )
    feellikethat = AlbumPodcast(
        artist_id=5, name="Feel Like That (feat. Bradley Nowell)", album_art="https://i.scdn.co/image/ab67616d0000b27361b7e027205d656d5b14b473", type="Single", price=4.99, genre="Ska"
    )
    rtog = AlbumPodcast(
        artist_id=6, name="The Roundtable of Gentlemen", album_art="https://bandfishbucket.s3.amazonaws.com/Round%2BTable.jpg", type="Podcast", price=0.00, genre="Comedy"
    )
    mmfood = AlbumPodcast(
        artist_id=1, name="MM...FOOD", album_art="https://i.scdn.co/image/ab67616d00001e0252f194d02c39909d1b284799", type="Album", price=9.99, genre="Hip-Hop"
    )
    opdoomsday = AlbumPodcast(
        artist_id=1, name="Operation: Doomsday", album_art="https://i.scdn.co/image/ab67616d00001e026ce90ec627a0198a8efd127f", type="Album", price=8.99, genre="Hip-Hop"
    )
    madvillainy = AlbumPodcast(
        artist_id=1, name="Madvillainy", album_art="https://i.scdn.co/image/ab67616d0000b27374dc897ea75402db37ef239a", type="Album", price=10.99, genre="Hip-Hop"
    )
    nitw1 = AlbumPodcast(
        artist_id=9, name="Night in the Woods (Original Soundtrack, Vol. 1) [At the End of Everything]", album_art="https://bandfishbucket.s3.amazonaws.com/nitw1.jpg", type="Album", price=14.99, genre="Soundtrack"
    )
    nitw2 = AlbumPodcast(
        artist_id=9, name="Night in the Woods (Original Soundtrack, Vol. 2) [Hold onto Anything]", album_art="https://i.scdn.co/image/ab67616d00001e029a283d61746fc5fef104732b", type="Album", price=12.99, genre="Soundtrack"
    )
    konatown = AlbumPodcast(
        artist_id=10, name="Kona Town", album_art="https://i.scdn.co/image/ab67616d00001e02d91bff6dd92c12d62ed3e072", type="Album", price=12.99, genre="Ska"
    )
    chronchitis = AlbumPodcast(
        artist_id=4, name="Chronchitis", album_art="https://i.scdn.co/image/ab67616d0000b273dc1886ac54cb45a8843404d7", type="Album", price=9.99, genre="Ska"
    )
    snsetebys = AlbumPodcast(
        artist_id=4, name="Slightly Not Stoned Enough to Eat Breakfast yet Stoopid", album_art="https://i.scdn.co/image/ab67616d00001e02390ecf99ae3cab55b1872582", type="Album", price=9.99, genre="Ska"
    )
    # newalb = AlbumPodcast(
    #     artist_id=1, name="No song album", album_art="", type="Album", price=0.00, genre="None"
    # )


    db.session.add(lpotl)
    db.session.add(ten)
    db.session.add(jarofflies)
    db.session.add(tripod)
    db.session.add(dirt)
    db.session.add(pjgreatesthits)
    db.session.add(wastinglight)
    db.session.add(colourandshape)
    db.session.add(fortyoztofreedom)
    db.session.add(sblime)
    db.session.add(feellikethat)
    db.session.add(rtog)
    db.session.add(mmfood)
    db.session.add(opdoomsday)
    db.session.add(madvillainy)
    db.session.add(nitw1)
    db.session.add(nitw2)
    db.session.add(konatown)
    db.session.add(chronchitis)
    db.session.add(snsetebys)
    # db.session.add(newalb)
    db.session.commit()

def undo_albums():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.albums_podcasts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM albums_podcasts"))

    db.session.commit()
