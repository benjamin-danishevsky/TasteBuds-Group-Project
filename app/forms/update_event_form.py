from flask_wtf import FlaskForm
from wtforms import StringField, DateTimeField, IntegerField, SubmitField
from wtforms.validators import DataRequired, Length

# Make the form for a new event
# get rid of the group name field
# if we restrict from only being able to create from groups
# page

# ! Date Time Format format='%Y-%m-%d %H:%M:%S'


class UpdatedEventForm(FlaskForm):
    title = StringField('title')
    description = StringField('description', validators=[DataRequired()])
    location = StringField('location', validators=[DataRequired(),  Length(min=3, max=100)])
    date = DateTimeField('date', validators=[DataRequired()])
    background_img = StringField('background_img', validators=[DataRequired()])
    updated_at = DateTimeField("updated_at")
