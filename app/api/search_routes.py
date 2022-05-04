from flask import Blueprint, jsonify, session, request
from app.models import Event, User, db, users_events, Group
from sqlalchemy import delete
from flask_login import current_user

search_route = Blueprint('search', __name__)


@search_route.route('/', methods=['POST'])
def search():

    if request.method == 'POST':
        info = request.json # { "search": "tennis san francisco" }
        print(info, '-------'*50)
        events = Event.query.filter(Event.location.ilike(f"%{info['search']}%")) #working
        return {
            "events": [event.to_dict() for event in events]
        }
        # groups = Group.query.filter(Group.name.ilike(f"%{info['search']}%"))


        # return {
        #     'events': events
        # }
