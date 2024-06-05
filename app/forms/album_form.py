from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, SelectField, DecimalField
from wtforms.validators import DataRequired, ValidationError
from flask_wtf.file import FileAllowed, FileField, FileRequired
from app.models import AlbumPodcast

class AlbumForm(FlaskForm):
    name = StringField("Album Title: ", validators=[DataRequired()])
    album_art = FileField("Album Cover Image: ", validators=[FileRequired(), FileAllowed(["png", "jpg", "jpeg"])])
    type = StringField("Media Type: ", validators=[DataRequired()])
    price = DecimalField("Price: ", validators=[DataRequired()])
    genre = StringField("Genre: ", validators=[DataRequired()])

class EditAlbumForm(FlaskForm):
    name = StringField("Album Title: ", validators=[DataRequired()])
    album_art = FileField("Album Cover Image: ", validators=[FileAllowed(["png", "jpg", "jpeg"])])
    type = StringField("Media Type: ", validators=[DataRequired()])
    price = DecimalField("Price: ", validators=[DataRequired()])
    genre = StringField("Genre: ", validators=[DataRequired()])
