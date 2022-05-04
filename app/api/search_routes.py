from flask import Blueprint, jsonify, session, request
from app.models import Event, User, db, users_events, Group
from sqlalchemy import delete
from flask_login import current_user

search_route = Blueprint('search', __name__)


@search_route.route('/', methods=['POST'])
def search():

    if request.method == 'POST':
        info = request.json # { "search": "tennis san francisco" }

        #events back from search by location
        # events = Event.query.filter(Event.location.ilike(f"%{info['search']}%")) #working
        # return {
        #     "events": [event.to_dict() for event in events]
        # }

        # all events back from search by group name
        groups = Group.query.filter(Group.name.ilike(f"%{info['search']}%")).all()
        new_list = sum([group.groups for group in groups], [])
        return {
            'events': [event.to_dict() for event in new_list]
        }
