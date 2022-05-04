from flask_wtf import FlaskForm
from wtforms import StringField, DateTimeField, IntegerField, SubmitField
from wtforms.validators import DataRequired, Length

# Make the form for a new event
# get rid of the group name field
# if we restrict from only being able to create from groups
# page
def title_error(form, field):
    title = field.data

# ! Date Time Format format='%Y-%m-%d %H:%M:%S'


class NewEventForm(FlaskForm):
    title = StringField('title')
    description = StringField('description', validators=[DataRequired()])
    location = StringField('location', validators=[DataRequired(),  Length(min=3, max=100)])
    date = DateTimeField('date', validators=[DataRequired()])
    background_img = StringField('background_img', validators=[DataRequired()])
    created_at = DateTimeField("created_at")
    updated_at = DateTimeField("updated_at")
    owner_id = IntegerField('owner_id', validators=[DataRequired()])
    group_id = IntegerField('group_id', validators=[DataRequired()])
