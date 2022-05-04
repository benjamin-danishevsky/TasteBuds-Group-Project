from flask import Blueprint, Flask, jsonify, session, request
from app.models import db, User, Group
from app.forms import NewGroupForm
from flask_login import login_required


group_routes = Blueprint('groups', __name__)

@group_routes.route('/')
def get_all_groups():
  groups = Group.query.all()
  return { 'groups': [group.to_dict() for group in groups] }


@group_routes.route('/<int:id>')
def get_group(id):
  group = Group.query.get(id)
  print(group, "===========================>"*50)
  return {"group": group.to_dict()}


# @group_routes.route('/<int:id>')
# def get_group(id):
#   groups = Group.query.join(User).filter(User.id == id).all();
#   response = {"groups": [group.to_dict() for group in groups]}
#   return response



@group_routes.route('/new-group', methods=['GET', 'POST'])
def newGroup():
  form = NewGroupForm()

  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    data = form.data
    newGroup = Group(
      name=data['name'],
      description=data['description'],
      background_img=data['background_img'],
      city=data['city'],
      state=data['state'],
      owner_id=data['owner_id'],
    )
    db.session.add(newGroup)
    db.session.commit()

    # response = {'data': newGroup.to_dict()}
    return {"group": newGroup.to_dict()}

  return form.errors

# @group_routes.route('/<int:id>', methods=["PUT"])
# @login_required
# def edit_group(id):


@group_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_group(id):
  print('----------BACKEND ROUTE HIT----------')
  group = Group.query.get(id);
  print('GROUP ID IS', '-' * 30, group)
  deleted = group.to_dict()
  db.session.delete(group)
  db.session.commit()
  return deleted
