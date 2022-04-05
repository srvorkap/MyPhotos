from .db import db
from .user import User
from .album import Album
from .album_photos import album_photos

class Photo(db.Model):
    __tablename__ = 'photos'

    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String, nullable=False)
    title = db.Column(db.String(30), nullable=False)
    description = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    album_id = db.Column(db.Integer, db.ForeignKey('albums.id'))

    user = db.relationship('User', back_populates='photos')
    # album = db.relationship('Album', back_populates='photos')
    albums = db.relationship('Album', back_populates='photos', secondary=album_photos)

    def to_dict(self):
        return {
            'id': self.id,
            'image_url': self.image_url,
            'title': self.title,
            'description': self.description,
            'album_id': self.album_id,
            'user_id': self.user_id,
            'user': self.user.to_dict()
        }
