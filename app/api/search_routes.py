from flask import Blueprint, jsonify, session, request
from app.models import Event, User, db, users_events, Group
from sqlalchemy import delete
from flask_login import current_user

search_route = Blueprint('search', __name__)


@search_route.route('/', methods=['POST'])
def search():

    if request.method == 'POST':
        info = request.json # { "search": "tennis san francisco" }
        info_list = info['search'].split(' ')

        final_events_list = set()
        for word in info_list:

            #events back from search by location
            events_location = Event.query.filter(Event.location.ilike(f"%{word}%")).all() #working
            # return {
            #     "events": [event.to_dict() for event in events]
            # }

            # all events back from search by group name
            groups = Group.query.filter(Group.name.ilike(f"%{word}%")).all()
            new_list_group_name = sum([group.groups for group in groups], [])
            # return {
            #     'events': [event.to_dict() for event in new_list]
            # }

            #all events back from search by group description
            groups2 = Group.query.filter(Group.description.ilike(f"%{word}%")).all()
            new_list_group_description = sum([group.groups for group in groups2], [])


            final_multi_list = [events_location, new_list_group_description, new_list_group_name]
            result = set().union(*final_multi_list)
            final_events_list.update(result)


        return {
            'events': [event.to_dict() for event in final_events_list]
        }
