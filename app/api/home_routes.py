# from flask import Blueprint, jsonify
# from flask_login import login_required
# from app.models import db,User

# home_routes = Blueprint('home', __name__)


# @home_routes.route('/<int:id>')
# @login_required
# def home(id):
#     users = User.query.get(id)
#     return user.to_dict()
    # return {'users': [user.to_dict() for user in users]}
