from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, AlbumPodcast, Wishlist


user_routes = Blueprint('users', __name__)


@user_routes.route('/')
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    userdict = user.to_dict()
    albums = AlbumPodcast.query.filter(AlbumPodcast.artist_id == id).all()
    wishlists = Wishlist.query.filter(Wishlist.user_id == id).all()
    userdict['albums'] = []
    for album in albums:
        userdict['albums'].append(album.to_dict())
    userdict['wishlists'] = []
    for wishlist in wishlists:
        wishlist_dict = wishlist.to_dict()
        wishlistalb = AlbumPodcast.query.get(wishlist_dict['product_id'])
        wishlist_dict['product'] = wishlistalb.to_dict()
        userdict['wishlists'].append(wishlist_dict)
    return jsonify(userdict)
