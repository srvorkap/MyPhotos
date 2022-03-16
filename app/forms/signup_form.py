from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


def password_match(form, field):
    password = form.data['password']
    repeat_password = field.data
    if password != repeat_password:
        raise ValidationError('Password inputs do not match')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired('Username is required.'), username_exists])
    email = StringField('email', validators=[
        DataRequired('Email is required.'),
        Email("Must be a valid email."),
        user_exists])
    password = StringField('password', validators=[DataRequired('Password is required.')])
    # repeat_password = StringField(validators=[password_match])
