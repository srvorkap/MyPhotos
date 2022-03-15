from flask import Blueprint, jsonify, session, request
from app.models import db, User, Album, Photo
from flask_login import current_user

album_routes = Blueprint('album', __name__)


@album_routes.get('/')
def get_all_albums():
    albums = Album.query.all()
    print(albums)
    albums_dict = [album.to_dict() for album in albums]
    print(albums_dict)
    return { 'albums': albums_dict}
    # album = Album.query.get(1)
    # album_dict = album.to_dict()
    # return { 'album': album_dict}
