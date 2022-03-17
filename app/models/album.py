from .db import db
# from .user import User
# from .photo import Photo
# from .album_photos import album_photos


class Album(db.Model):
    __tablename__ = 'albums'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(30), nullable=False)
    description = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    user = db.relationship('User', back_populates='albums')
    # photos = db.relationship('Photo', backpopulates='albums', secondary=album_photos)
    photos = db.relationship('Photo', back_populates='album')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'user_id': self.user_id,
            # 'photos': [ ]
        }
