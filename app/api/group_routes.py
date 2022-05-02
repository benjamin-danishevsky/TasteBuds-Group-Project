from flask import Blueprint, Flask, jsonify
from app.models import db, User, Group

group_routes = Blueprint('groups', __name__)

@group_routes.route('/')
def get_all_groups():
  groups = Group.query.all()
  return { 'groups': [group.to_dict() for group in groups] }

@group_routes.route('/<int:id>')
def get_group(id):
  group = Group.query.get(id);
  return group.to_dict()
