from flask import Blueprint, request, jsonify
from app.models import User, db, Wishlist, AlbumPodcast
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
from .aws_helpers import upload_file_to_s3, get_unique_filename
auth_routes = Blueprint('auth', __name__)


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        userdict = current_user.to_dict()
        wishlists = Wishlist.query.filter(Wishlist.user_id == userdict['id'])
        userdict['wishlists'] = []
        for wishlist in wishlists:
            wishlist_dict = wishlist.to_dict()
            wishlistalb = AlbumPodcast.query.get(wishlist_dict['product_id'])
            wishlist_dict['product'] = wishlistalb.to_dict()
            userdict['wishlists'].append(wishlist_dict)
        return jsonify(userdict)
    return {'errors': {'message': 'Unauthorized'}}, 401


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return form.errors, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        profile_pic = form.profile_pic.data
        profile_pic.filename = get_unique_filename(profile_pic.filename)
        upload = upload_file_to_s3(profile_pic)
        pfp_url = upload["url"]

        profile_banner = form.profile_banner.data
        pfb_url = None
        if profile_banner:
            profile_banner.filename = get_unique_filename(profile_banner.filename)
            upload2 = upload_file_to_s3(profile_banner)
            pfb_url = upload2["url"]

        user = User(
            firstname=form.data['firstname'],
            lastname=form.data['lastname'],
            username=form.data['username'],
            email=form.data['email'],
            profile_pic=pfp_url,
            profile_banner=pfb_url,
            password=form.data['password']
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return form.errors, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': {'message': 'Unauthorized'}}, 401
