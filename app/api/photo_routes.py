from flask import Blueprint, jsonify, session, request
from app.models import db, User, Album, Photo
from flask_login import current_user
# from app.forms.album_form import AlbumForm
from app.api.auth_routes import validation_errors_to_error_messages

photo_routes = Blueprint('photo', __name__)


@photo_routes.route('/')
def get_all_photos():
    photos = Photo.query.all()
    photos_dict = [ photo.to_dict() for photo in photos ]

    return { 'photos': photos_dict }


@photo_routes.route('/', methods=['POST'])
def post_photo():
    pass
