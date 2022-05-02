from flask import Blueprint, jsonify, session, request
from app.models import Event, User, db
from app.forms import NewEventForm
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

@events_route.route('/new-event', methods=['GET', 'POST'])
def new_event():
    form = NewEventForm()

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
                      group_id=data['group_id']
                    )
        db.session.add(event)
        db.session.commit()
        return 'Success'

    return form.errors
