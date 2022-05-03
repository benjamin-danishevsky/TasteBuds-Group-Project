from flask import Blueprint, jsonify, session, request
from app.models import Event, User, db
from app.forms import NewEventForm, UpdatedEventForm
from datetime import datetime
events_route = Blueprint('events', __name__)


@events_route.route('/')
def events():
    events = Event.query.all()

    return {
        "events": [event.to_dict() for event in events]
    }

@events_route.route('/<int:id>')
def single_event(id):
    event = Event.query.get(id)
    return {
        "event": event.to_dict()
    }

@events_route.route('/<int:id>', methods=['DELETE'])
def delete_event(id):
    deleted_event = Event.query.get(id)
    db.session.delete(deleted_event)
    db.session.commit()
    return deleted_event.to_dict()

@events_route.route('/<int:id>/update', methods=['POST'])
def update_event(id):
    current_event = Event.query.get(id)
    form = UpdatedEventForm()
    if form.validate_on_submit():
        
        data = form.data

        current_event.title = data["title"]
        current_event.description = data["description"]
        current_event.date = data["date"]
        current_event.location = data["location"]
        current_event.background_img = data["background_img"]
        current_event.updated_at = datetime.now()

        db.session.commit()

        return current_event.to_dict()

    return form.errors
# @events_route.route('/new-event', methods=['GET', 'POST'])
# def new_event():
#     form = NewEventForm()

#     if form.validate_on_submit():
#         data = form.data
#         event = Event(
#                       title=data['title'],
#                       description=data['description'],
#                       location=data['location'],
#                       date=data['date'],
#                       background_img=data['background_img'],
#                       created_at=datetime.now(),
#                       updated_at=datetime.now(),
#                       owner_id=data['owner_id'],
#                       group_id=data['group_id']
#                     )
#         db.session.add(event)
#         db.session.commit()
#         return 'Success'

#     return form.errors
