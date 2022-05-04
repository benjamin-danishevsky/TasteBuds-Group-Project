from flask_wtf import FlaskForm
from wtforms.validators import DataRequired, Length
from wtforms import StringField, IntegerField


def name_error(form, field):
    name = field.data

class NewGroupForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    background_img = StringField('background_img', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired(),  Length(min=3, max=100)])
    state = StringField('state', validators=[DataRequired(),  Length(min=3, max=100)])

    owner_id = IntegerField('owner_id', validators=[DataRequired()])
