from flask_wtf import FlaskForm
from wtforms.fields import IntegerField, StringField, SelectField, TextAreaField, FileField, SelectMultipleField
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
        raise ValidationError('Image URL must end with .jpg, .gif, .png')

class PhotoForm(FlaskForm):
    image_url = StringField('image_url', validators=[DataRequired('Image URL is required.'),
    Length(max=254, message="Image URL must be < 255 characters."), check_url])

    title = StringField('title', validators=[DataRequired('Title is required.'),
    Length(max=29, message="Title must be less then 30 characters."),
    Length(min=4, message="Title must be at least 4 characters long.")])

    description = TextAreaField('description', validators=[
        Length(max=254, message="Description must be < 255 characters.")])
    # validators=[Length(max=255, message="Description must be < 255 characters")])

    # album_id = SelectField('album_id', choices=[])
    # album_id = SelectField('album_id', validate_choice=False)
    albums = SelectMultipleField('albums', validate_choice=False)
