from flask_wtf import FlaskForm
from wtforms import StringField, DateTimeField, IntegerField, SubmitField
from wtforms.validators import DataRequired, Length


class NewEventForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), Length(min=3, max=50)])
    description = StringField('description', validators=[DataRequired()])
    location = StringField('location', validators=[DataRequired(),  Length(min=3, max=100)])
    date = DateTimeField('date', validators=[DataRequired()])
    background_img = StringField('background_img', validators=[DataRequired()])
    