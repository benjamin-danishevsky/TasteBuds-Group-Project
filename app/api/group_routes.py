from flask import Blueprint, Flask, jsonify, session, request
from app.models import db, User, Group
# from app.forms import NewGroupForm
from app.forms import EditGroupForm
from flask_login import login_required


group_routes = Blueprint('groups', __name__)

@group_routes.route('/')
def get_all_groups():
  groups = Group.query.all()
  return { 'groups': [group.to_dict() for group in groups] }

@group_routes.route('/<int:id>')
def get_group(id):
  group = Group.query.get(id);
  return {"group": group.to_dict()}

# @group_routes.route('/new-group', methods=['GET', 'POST'])
# def newGroup():
#   form = NewGroupForm()

#   if form.validate_on_submit():
#         data = form.data
#         group = Group(
#                       name=data['name'],
#                       description=data['description'],
#                       background_img=data['background_img'],
#                       city=data['city'],
#                       state=data['state'],
#                       owner_id=data['owner_id'],
#                       )
#         db.session.add(group)
#         db.session.commit()
#         return 'Group Created!'

#     return form.errors
# EDIT
@group_routes.route('/<int:id>/edit', methods=["POST"])
@login_required
def edit_group(id):
  form = EditGroupForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  data = form.data
  group = Group.query.get(id)

  if form.validate_on_submit():
    group.name = data["name"],
    group.description = data["description"],
    group.background_img = data["background_img"],
    group.city = data["city"],
    group.state = data["state"]

    db.session.commit()
    return group.to_dict()

  return form.errors


@group_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_group(id):
  group = Group.query.get(id);
  deleted = group.to_dict()
  db.session.delete(group)
  db.session.commit()
  return deleted
