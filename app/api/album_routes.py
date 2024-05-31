from flask import Blueprint, jsonify, json, request, redirect
from app.models import AlbumPodcast, Review, User, db
from flask_login import login_required, current_user
# from app.forms
album_routes = Blueprint('albums', __name__)

@album_routes.route("/all")
def albums_n_podcasts():
    fetched = AlbumPodcast.query.all()
    fetched_list = []
    for album in fetched:
        album_dict = album.to_dict()
        fetched_list.append(album_dict)
    return {'albums and podcasts': fetched_list}

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
        # fetched_album['reviews']
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

@album_routes.route("/new")
@login_required
def new_album():
    pass
