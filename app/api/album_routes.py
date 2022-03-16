from flask import Blueprint, jsonify, session, request
from app.models import db, User, Album, Photo
from flask_login import current_user
from app.forms.album_form import AlbumForm
from app.api.auth_routes import validation_errors_to_error_messages

album_routes = Blueprint('album', __name__)


@album_routes.route('/')
def get_all_albums():
    albums = Album.query.all()
    albums_dict = [album.to_dict() for album in albums]
    return { 'albums': albums_dict }


@album_routes.route('/', methods=['POST'])
def post_album():
    current_user_id = 1 #current_user.get_id()
    form = AlbumForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data
    print(form.data)

    if form.validate_on_submit():
        title = data['title']
        description = data['description']

        album = Album(
            title = title,
            description = description,
            user_id = current_user_id
        )

        db.session.add(album)
        db.session.commit()
        return { 'album': album.to_dict()}
    return { 'errors': validation_errors_to_error_messages(form.errors)}, 400


@album_routes.route('/<int:album_id>/edit', methods=['PATCH'])
def patch_album(album_id):
    form = AlbumForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        album = Album.query.get(album_id)

        data = form.data
        album.title = data['title']
        album.description = data['description']

        db.session.commit()
        return { 'album': album.to_dict()}
    return { 'errors': validation_errors_to_error_messages(form.errors)}, 400


@album_routes.route('/<int:album_id>', methods=['DELETE'])
def delete_album(album_id):
    photos = Photo.query.filter(Photo.album_id == album_id).all()
    print(photos)
    for photo in photos:
        db.session.delete(photo)
        db.session.commit()

    album = Album.query.get(album_id)
    db.session.delete(album)
    db.session.commit()

    return { 'message': 'success' }
