from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, SelectField
from wtforms.validators import DataRequired, ValidationError
from flask_wtf.file import FileAllowed, FileField, FileRequired
from app.models import Review

class ReviewForm(FlaskForm):
    title = StringField("Review title: ", validators=[DataRequired()])
    body = StringField("Review body: ", validators=[DataRequired()])

class EditReviewForm(FlaskForm):
    title = StringField("Review title: ", validators=[DataRequired()])
    body = StringField("Review body: ", validators=[DataRequired()])
