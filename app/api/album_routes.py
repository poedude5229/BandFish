from flask import Blueprint, jsonify, json, request, redirect
from app.models import AlbumPodcast, Review, User, SongEpisode, db
from flask_login import login_required, current_user
from app.forms import AlbumForm, EditAlbumForm, ReviewForm, EditReviewForm, SongForm, EditSong
from .aws_helpers import upload_file_to_s3, get_unique_filename
album_routes = Blueprint('albums', __name__)

@album_routes.route("/all", methods=["GET"])
def albums_n_podcasts():
    fetched = AlbumPodcast.query.all()
    fetched_list = []
    for album in fetched:
        album_artist = User.query.get(album.artist_id)
        artistdict = album_artist.to_dict()
        album_dict = album.to_dict()
        album_dict['artist'] = f"{artistdict['firstname']} {artistdict['lastname']}"
        fetched_list.append(album_dict)
    return {'albums_and_podcasts': fetched_list}

@album_routes.route("/new", methods=["POST"])
@login_required
def new_album():
    form = AlbumForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        album_art = form.album_art.data
        album_art.filename = get_unique_filename(album_art.filename)
        upload = upload_file_to_s3(album_art)
        album_art_url = upload["url"]
        new = AlbumPodcast(
            artist_id=current_user.id,
            name=form.data['name'],
            album_art=album_art_url,
            type=form.data['type'],
            price=form.data['price'],
            genre=form.data['genre']
        )
        db.session.add(new)
        db.session.commit()
        return new.to_dict()

@album_routes.route("/albums")
def albums():
    fetched3 = AlbumPodcast.query.filter(AlbumPodcast.type != "Podcast").all()
    fetched_list = []
    for album in fetched3:
        album_dict = album.to_dict()
        album_artist = User.query.get(album.artist_id)
        artistdict = album_artist.to_dict()
        album_dict = album.to_dict()
        album_dict['artist'] = f"{artistdict['firstname']} {artistdict['lastname']}"
        fetched_list.append(album_dict)
    return {'albums': fetched_list}

@album_routes.route('/podcasts')
def podcasts():
    fetched4 = AlbumPodcast.query.filter(AlbumPodcast.type == "Podcast").all()
    fetched_list = []
    for podcast in fetched4:
        podcast_dict = podcast.to_dict()
        fetched_list.append(podcast_dict)
    return {'podcasts': fetched_list}

@album_routes.route("/new", methods=["POST"])
@login_required
def album_post():
    form = AlbumForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        album_art = form.album_art.data
        album_art.filename = get_unique_filename(album_art.filename)
        upload = upload_file_to_s3(album_art)
        album_art_url = upload["url"]

        new = AlbumPodcast(
            name=form.data['name'],
            album_art=album_art_url,
            type=form.data['type'],
            price=form.data['price'],
            genre=form.data['genre']
        )
        db.session.add(new)
        db.session.commit()
        return new.to_dict(), 201
    else:
        return form.errors, 400

@album_routes.route("<int:id>", methods=["PUT"])
@login_required
def update_album(id):
    selected = AlbumPodcast.query.get(id)
    if not selected:
        return {"message":"Could not find the Album/Podcast to delete"}, 404

    form = EditAlbumForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        album_art = form.album_art.data
        album_art.filename = get_unique_filename(album_art.filename)
        upload = upload_file_to_s3(album_art)
        album_art_url = upload["url"]

        selected.name = form.data['name']
        selected.album_art = album_art_url
        selected.type = form.data['type']
        selected.price = form.data['price']
        selected.genre = form.data['genre']
        db.session.commit()

    return selected.to_dict(), 200

@album_routes.route('/<int:id>')
def fetch_album_details(id):
    fetched = AlbumPodcast.query.get(id)
    # album_to_return = {}
    if fetched:
        fetched_album = fetched.to_dict()
        reviews = Review.query.filter(Review.item_id == id).all()
        songs = SongEpisode.query.filter(SongEpisode.album_id == id).all()
        # fetched_album['reviews']
        album_songs = []
        if songs:
            for song in songs:
                songdict = song.to_dict()
                album_songs.append(songdict)
        fetched_album['tracks'] = album_songs
        album_reviews = []
        for review in reviews:
            reviewdict = review.to_dict()
            reviewuser = User.query.get(reviewdict['user_id'])
            # print(reviewuser.to_dict())
            reviewdict['user'] = reviewuser.to_dict()['username']
            album_reviews.append(reviewdict)
        fetched_album['reviews'] = album_reviews
        return fetched_album
    return {"message":"Album/Podcast could not be found or does not exist"}


@album_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_album(id):
    fetched_album2 = AlbumPodcast.query.get(id)
    if not fetched_album2:
        return {"message":"Can't find the album to delete"}, 404
    else:
        if fetched_album2.artist_id == current_user.id:
            db.session.delete(fetched_album2)
            db.session.commit()
            return json.dumps({"message":"Successfully deleted the album"}), 202
        else:
            return json.dumps({"message":"You are not authorizzed to delete this album or podcast"}), 403

@album_routes.route("/<int:id>/reviews", methods=["GET"])
def get_alb_reviews(id):
    album_reviews = Review.query.filter(Review.item_id == id).all()

    if album_reviews is not None:
        # all_reviews = {"reviews": [each.to_dict() for each in album_reviews]}
        rv_list = []
        for each in album_reviews:
            better_format_review = each.to_dict()
            rv_user = User.query.get(better_format_review['user_id'])
            better_format_review['user'] = rv_user.to_dict()['username']
            rv_list.append(better_format_review)
        all_reviews = {'reviews': rv_list}
    else:
        all_reviews = {"reviews": []}
    return all_reviews

@album_routes.route("/<int:id>/reviews/new", methods=["POST"])
@login_required
def post_alb_review(id):
    form = ReviewForm()
    if form.validate_on_submit():
        new_review = Review(
            user_id = current_user.id,
            item_id = id,
            title = form.data['title'],
            body = form.data['body']
        )
        db.session.add(new_review)
        db.session.commit()
    return new_review.to_dict()

@album_routes.route("/<int:id>/reviews/<int:reviewId>", methods=["PUT"])
@login_required
def update_review(id, reviewId):
    form = EditReviewForm()
    selected_review = Review.query.get(reviewId)
    if not selected_review:
        return {"message": "Review couldn't be found"}, 404
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        selected_review.title = form.data['title']
        selected_review.body = form.data['rating']
        db.session.commit()
    return selected_review.to_dict(), 200

@album_routes.route("/<int:id>/reviews/<int:reviewId>", methods=["DELETE"])
@login_required
def delete_review(id, reviewId):
    indv_review = Review.query.get(reviewId)

    if not indv_review:
        return {"message":"Review couldn't be found"}
    else:
        db.session.delete(indv_review)
        db.session.commit()

    return json.dumps({"message":"Successfully deleted review"})

@album_routes.route("/<int:id>/tracks", methods=["GET"])
def get_album_songs(id):
    requested_album = AlbumPodcast.query.get(id)

    if requested_album:
        alb1 = requested_album.to_dict()
        songs = SongEpisode.query.filter(SongEpisode.album_id == id)
        alb_songs = []
        if songs:
            for song in songs:
                songdict = song.to_dict()
                songdict['album_name'] = alb1['name']
                alb_songs.append(songdict)
        return {"songs": alb_songs}
    return {"message":"Album / Podcast could not be found or does not exist"}

@album_routes.route("/<int:id>/tracks/new", methods=["POST"])
@login_required
def song_post(id):
    selected = AlbumPodcast.query.get(id)
    if not selected:
        return {"message":"Album / Podcast could not be found or does not exist"}

    form = SongForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # title = form.data['title']
        source = form.source.data
        source.filename = get_unique_filename(source.filename)
        upload = upload_file_to_s3(source)
        source_url = upload['url']
        if form.data['duration']:
            songdur = form.data['duration']
        else:
            songdur = "0:00"
        newsong = SongEpisode(
            artist_id=current_user.id,
            album_id=id,
            title=form.data['title'],
            source=source_url,
            duration = songdur
        )
        db.session.add(newsong)
        db.session.commit()
        return newsong.to_dict(), 201
    else:
        return form.errors, 400

@album_routes.route("/<int:id>/tracks/<int:trackId>", methods=["PUT"])
@login_required
def edit_song(id, trackId):
    selected  = AlbumPodcast.query.get(id)
    if not selected:
        return {"message":"Album / Podcast couldn't be found or does not exist"}
    song_to_update = SongEpisode.query.get(trackId)
    form = EditSong()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        if form.source.data:
            source = form.source.data
            source.filename = get_unique_filename(source.filename)
            upload = upload_file_to_s3(source)
            source_url = upload['url']
        else:
            source_url = song_to_update['source']

        if form.data['duration']:
            songdur = form.data['duration']
        else:
            songdur = song_to_update['duration']
        song_to_update.title = form.data['title']
        song_to_update.source = source_url
        song_to_update.duration = songdur

        db.session.commit()

    return song_to_update.to_dict(), 200


@album_routes.route("/<int:id>/tracks/<int:trackId>", methods=["DELETE"])
@login_required
def delete_song(id, trackId):
    got_album = AlbumPodcast.query.get(id)
    if not got_album:
        return {"message":"Album / Podcast could not be found or does not exist"}
    get_song = SongEpisode.query.get(trackId)
    if not get_song:
        return {"message":"Song / Episode could not be found or does not exist"}
    db.session.delete(get_song)
    db.session.commit()
    return json.dumps({"message":"Successfully deleted song."})
