from flask import Blueprint, Flask, jsonify, session, request
from app.models import db, User, Group, Event
from app.forms import NewGroupForm, NewEventForm
from datetime import datetime

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

@group_routes.route('/<int:id>/new-event', methods=['GET', 'POST'])
def new_event(id):
    print('payload ::::', id)
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
          # print('New event', event.to_dict())
          return {
            "event": event.to_dict()
          }

    return form.errors
