from flask_wtf import FlaskForm
from wtforms.fields import IntegerField, StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import Album

# add custom validators
class AlbumForm(FlaskForm):
    title = StringField('title', validators=[DataRequired('Title is required.'),
    Length(max=30, message="Title must be < 30 characters."),
    Length(min=2, message="Title must be > 1 character.")])

    description = StringField('description', validators=[Length(max=255, message="Description must be < 255 characters"),
    Length(min=2, message="Description must be > 1 character")])
