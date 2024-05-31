from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, SelectField
from wtforms.validators import DataRequired, ValidationError
from flask_wtf.file import FileAllowed, FileField, FileRequired
from app.models import SongEpisode

class SongForm(FlaskForm):
    title = StringField("Song or Episode title: ", validators=[DataRequired()])
    source = FileField("Upload mp3 file", validators=[FileRequired(), FileAllowed(["mp3"])])
    duration = StringField("How long is this track? Format hour:minute:seconds or minute:seconds")

class EditSong(FlaskForm):
    title = StringField("Change the name of the song: ", validators=[DataRequired()])
    source = FileField("Pick the wrong mp3? No problem, upload the new one here", validators=[FileRequired(), FileAllowed(["mp3"])])
    duration = StringField("How long is this track? Format hour:minute:seconds or minute:seconds")
