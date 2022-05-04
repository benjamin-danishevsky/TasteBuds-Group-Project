from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

user_routes = Blueprint('home', __name__)


@user_routes.route('/<int:id>')
@login_required
def home():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}
