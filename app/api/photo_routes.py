from cmath import cos
from crypt import methods
from flask import Blueprint, jsonify, session, request
from app.models import db, User, Album, Photo
from flask_login import current_user
from app.forms.photo_form import PhotoForm
from app.api.auth_routes import validation_errors_to_error_messages
from app.aws import (
    upload_file_to_s3, allowed_file, get_unique_filename)

photo_routes = Blueprint('photo', __name__)


@photo_routes.route('/')
def get_all_photos():
    photos = Photo.query.all()
    return {'photos': {photo.to_dict()['id']: photo.to_dict() for photo in photos }}


@photo_routes.route('/', methods=['POST'])
def post_photo():
    current_user_id = current_user.get_id()
    # current_user_id = 1
    form = PhotoForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = request.json

    if form.validate_on_submit():
        image_url = data['image_url']
        title = data['title']
        description = data['description']
        album_ids = data['album_ids']

        photo = Photo(
            image_url=image_url,
            title=title,
            description=description,
            user_id=current_user_id,
        )
        for album_id in album_ids:
            album = Album.query.get(album_id)
            photo.albums.append(album)

        db.session.add(photo)
        db.session.commit()
        return { 'photo': photo.to_dict()}
    return { 'errors': validation_errors_to_error_messages(form.errors)}, 400


@photo_routes.route('/<int:photo_id>/edit', methods=['PATCH'])
def patch_photo(photo_id):
    print('1111111111')
    current_user_id = current_user.get_id()
    # current_user_id = 1
    form = PhotoForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = request.json
    print(data)
    # data = form.data

    if form.validate_on_submit():
        photo = Photo.query.get(photo_id)

        # data = form.data
        photo.image_url = data['image_url']
        photo.title = data['title']
        photo.description = data['description']
        album_ids = data['album_ids']

        print(album_ids)
        photo.albums = []

        for album_id in album_ids:
            album = Album.query.get(album_id)
            photo.albums.append(album)

        # if data['album_id'] != 'None':  !!!!!!!! DAVID SHOWED ME
        #     photo.album_id = data['album_id']
        # photo.album_id = data['album_id']

        db.session.commit()
        return { 'photo': photo.to_dict()}
    return { 'errors': validation_errors_to_error_messages(form.errors)}, 400


@photo_routes.route('/<int:photo_id>', methods=['DELETE'])
def delete_photo(photo_id):
    photo = Photo.query.get(photo_id)

    db.session.delete(photo)
    db.session.commit()

    return { 'message': 'photo deleted successfully' }
