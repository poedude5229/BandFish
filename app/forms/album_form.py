from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, ValidationError
from flask_wtf.file import FileAllowed, FileField, FileRequired
from app.models import AlbumPodcast

class AlbumForm(FlaskForm):
    name = StringField("Album Title", validators=[DataRequired()])
    album_art = ()
