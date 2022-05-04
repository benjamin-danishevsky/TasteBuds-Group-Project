from flask_wtf import FlaskForm
from wtforms import StringField, DateTimeField, IntegerField, SubmitField
from wtforms.validators import DataRequired

class EditGroupForm(FlaskForm):
    name = StringField('name')
    description = StringField('description', validators=[DataRequired()])
    background_img = StringField('background_img', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
