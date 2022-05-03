from flask import Blueprint, Flask, jsonify, session
from app.models import db, User, Group
from app.forms import NewGroupForm


group_routes = Blueprint('groups', __name__)

@group_routes.route('/')
def get_all_groups():
  groups = Group.query.all()
  return { 'groups': [group.to_dict() for group in groups] }

@group_routes.route('/<int:id>')
def get_group(id):
  group = Group.query.get(id);
  return {"group": group.to_dict()}

@group_routes.route('/new-group', methods=['GET', 'POST'])
def newGroup():
  form = NewGroupForm()

  if form.validate_on_submit():
        data = form.data
        group = Group(
                      name=data['name'],
                      description=data['description'],
                      background_img=data['background_img'],
                      city=data['city'],
                      state=data['state'],
                      owner_id=data['owner_id'],
                      )
        db.session.add(group)
        db.session.commit()
        return 'Group Created!'

  return form.errors
