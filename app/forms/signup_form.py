from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, SelectField
from wtforms.validators import DataRequired, Email, ValidationError
from flask_wtf.file import FileAllowed, FileField, FileRequired
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


class SignUpForm(FlaskForm):
    firstname = StringField('First Name', validators=[DataRequired()])
    lastname = StringField("Last Name", validators=[DataRequired()])
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists])
    profile_pic = FileField("Avatar", validators=[FileRequired(), FileAllowed(["png","jpg","jpeg"])])
    profile_banner = FileField("Profile Banner", validators=[FileRequired(), FileAllowed(["png","jpg","jpeg"])])
    # role = SelectField("Role", choices=[("")])
    password = StringField('password', validators=[DataRequired()])
