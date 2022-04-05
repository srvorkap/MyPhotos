from .db import db

album_photos = db.Table(
    'album_photos',
    db.Column('album_id', db.Integer, db.ForeignKey('albums.id'), primary_key=True),
    db.Column('photo_id', db.Integer, db.ForeignKey('photos.id'), primary_key=True)
)
