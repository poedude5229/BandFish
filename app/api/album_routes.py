from flask import Blueprint, jsonify, json, request, redirect
from app.models import AlbumPodcast, Review, User, SongEpisode, db
from flask_login import login_required, current_user
from app.forms import AlbumForm
from .aws_helpers import upload_file_to_s3, get_unique_filename
album_routes = Blueprint('albums', __name__)

@album_routes.route("/all")
def albums_n_podcasts():
    fetched = AlbumPodcast.query.all()
    fetched_list = []
    for album in fetched:
        album_artist = User.query.get(album.artist_id)
        artistdict = album_artist.to_dict()
        album_dict = album.to_dict()
        album_dict['artist'] = f"{artistdict['firstname']} {artistdict['lastname']}"
        fetched_list.append(album_dict)
    return {'albums and podcasts': fetched_list}

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
    fetched = AlbumPodcast.query.filter(AlbumPodcast.type != "Podcast").all()
    fetched_list = []
    for album in fetched:
        album_dict = album.to_dict()
        fetched_list.append(album_dict)
    return {'albums': fetched_list}

@album_routes.route('/podcasts')
def podcasts():
    fetched = AlbumPodcast.query.filter(AlbumPodcast.type == "Podcast").all()
    fetched_list = []
    for podcast in fetched:
        podcast_dict = podcast.to_dict()
        fetched_list.append(podcast_dict)
    return {'podcasts': fetched_list}

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
        return {"message":"Can't find the album to delete"}
    else:
        if fetched_album2.artist_id == current_user.id:
            db.session.delete(fetched_album2)
            db.session.commit()
            return json.dumps({"message":"Successfully deleted the album"}), 202
            