from flask_wtf import FlaskForm
from wtforms.validators import DataRequired, Length
from wtforms import StringField, IntegerField, SubmitField

class NewGroupForm(FlaskForm):
    name = StringField('name')
    description = StringField('description', validators=[DataRequired()])
    background_img = StringField('background_img', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired(),  Length(min=3, max=100)])
    state = StringField('state', validators=[DataRequired(),  Length(min=3, max=100)])
    submit = SubmitField('Submit')
    
    owner_id = IntegerField('owner_id', validators=[DataRequired()])
