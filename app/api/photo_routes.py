from flask import Blueprint, jsonify, session, request
from app.models import db, User, Album, Photo
from flask_login import current_user
from app.forms.photo_form import PhotoForm
from app.api.auth_routes import validation_errors_to_error_messages

photo_routes = Blueprint('photo', __name__)


@photo_routes.route('/')
def get_all_photos():
    photos = Photo.query.all()
    photos_dict = [ photo.to_dict() for photo in photos ]

    return { 'photos': [photo.to_dict() for photo in photos] }

@photo_routes.route('/', methods=['POST'])
def post_photo():
    current_user_id = 1 #current_user.get_id()
    form = PhotoForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data

    if form.validate_on_submit():
        image_url = data['image_url']
        title = data['title']
        description = data['description']
        album_id = data['album_id']
        photo = Photo(
            image_url = image_url,
            title = title,
            description = description,
            user_id = current_user_id,
            album_id = album_id
        )

        db.session.add(photo)
        db.session.commit()
        return { 'photo': photo.to_dict()}
    return { 'errors': validation_errors_to_error_messages(form.errors)}, 400
