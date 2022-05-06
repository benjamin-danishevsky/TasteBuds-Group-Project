from flask import Blueprint, Flask, jsonify, session, request
from app.models import db, User, Group, Event
from app.forms import NewGroupForm
from app.forms import EditGroupForm
from flask_login import login_required, current_user
from app.forms import NewEventForm
from datetime import datetime

group_routes = Blueprint('groups', __name__)

@group_routes.route('/')
def get_all_groups():
  groups = Group.query.all()
  return { 'groups': [group.to_dict() for group in groups] }


@group_routes.route('/<int:id>')
def get_group(id):
  group = Group.query.get(id)
  return {"group": group.to_dict()}

@group_routes.route('/<int:id>/events')
def get_events_from_group(id):
  groups = Group.query.get(id)
  events = groups.groups
  return { 'events': [event.to_dict() for event in events] }


@group_routes.route('/<int:id>/groups', methods=['GET','POST', 'DELETE'])
@login_required
def joining_group(id):
  if request.method == 'GET':
    group = Group.query.get(id)
    users = group.users
    return { 'users': [user.to_dict() for user in users] }

  if request.method == 'POST':
    info = request.json
    currentGroup = Group.query.get(id)
    currentGroup.users.append(current_user)
    db.session.commit()
    return info

  if request.method == 'DELETE':
    currentGroup = Group.query.get(id)
    currentGroup.users.remove(current_user)
    db.session.commit()

    return {
      "user": current_user.to_dict()
    }



@group_routes.route('/new-group', methods=['GET', 'POST'])
def newGroup():
  form = NewGroupForm()

  form['csrf_token'].data = request.cookies['csrf_token']

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
        return {'group' : group.to_dict()}

  return form.errors

@group_routes.route('/<int:id>/new-event', methods=['GET', 'POST'])
def new_event(id):
    form = NewEventForm()

    if request.method == "POST":
      form['csrf_token'].data = request.cookies['csrf_token']
      if form.validate_on_submit():
          data = form.data
          event = Event(
                        title=data['title'],
                        description=data['description'],
                        location=data['location'],
                        date=data['date'],
                        background_img=data['background_img'],
                        created_at=datetime.now(),
                        updated_at=datetime.now(),
                        owner_id=data['owner_id'],
                        group_id=id
                      )
          db.session.add(event)
          db.session.commit()
          return {
            "event": event.to_dict()
          }

    return 'hello ben'

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



@group_routes.route("/<int:id>/calendar", methods=["POST"])
def getCalendar(id):
  eventList = []
  res = request.json

  group = Group.query.get(id)
  events = group.groups

  element = res['datetime']
  date = element.split()[0]

  for event in events:
    if str(event.date).split()[0] == str(date):
      eventList.append(event)
  if len(eventList):
        return {"event": [event.to_dict() for event in eventList]}
  else:
    return {}
