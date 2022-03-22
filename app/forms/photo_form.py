from flask_wtf import FlaskForm
from wtforms.fields import IntegerField, StringField, SelectField, TextAreaField, FileField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import Photo
import re

# add custom validators
def password_match(form, field):
    password = form.data['password']
    repeat_password = field.data
    if password != repeat_password:
        raise ValidationError('Password inputs do not match')

def check_url(form, field):
    print('in url_is_an_image------------------')
    image_url = field.data
    regular_expresion = '(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)'
    url_is_an_image = re.match(regular_expresion, image_url)
    if not url_is_an_image:
        raise ValidationError('Please use correct image URL.')

class PhotoForm(FlaskForm):
    image_url = StringField('image_url', validators=[DataRequired('Image URL is required.'),
    Length(max=255, message="Image URL must be < 255 characters."),
    Length(min=2, message="Image URL must be > 1 character."), check_url])

    title = StringField('title', validators=[DataRequired('Title is required.'),
    Length(max=30, message="Title must be < 30 characters."),
    Length(min=2, message="Title must be > 1 character.")])

    description = TextAreaField('description', validators=[
        Length(max=255, message="Description must be < 255 characters.")])
    # validators=[Length(max=255, message="Description must be < 255 characters")])

    # album_id = SelectField('album_id', choices=[])
    album_id = SelectField('album_id', validate_choice=False)
