from .db import db
# from .user import User
# from .photo import Photo
from .album_photos import album_photos


class Album(db.Model):
    __tablename__ = 'albums'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(30), nullable=False)
    description = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    user = db.relationship('User', back_populates='albums')
    # photos = db.relationship('Photo', back_populates='album')
    photos = db.relationship('Photo', back_populates='albums', secondary=album_photos)

    def a_to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'user_id': self.user_id
        }

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'user_id': self.user_id,
            'photos': [photo.p_to_dict() for photo in self.photos]
        }
