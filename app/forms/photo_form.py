from flask_wtf import FlaskForm
from wtforms.fields import IntegerField, StringField, SelectField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import Photo

# add custom validators

class PhotoForm(FlaskForm):
    image_url = StringField('image_url', validators=[DataRequired('Image URL is required.'),
    Length(max=255, message="Image URL must be < 255 characters."),
    Length(min=2, message="Image URL must be > 1 character.")])

    title = StringField('title', validators=[DataRequired('Title is required.'),
    Length(max=30, message="Title must be < 30 characters."),
    Length(min=2, message="Title must be > 1 character.")])

    description = TextAreaField('description', validators=[])
    # validators=[Length(max=255, message="Description must be < 255 characters")])

    # album_id = SelectField('album_id', choices=[])
    album_id = SelectField('album_id', validate_choice=False)
