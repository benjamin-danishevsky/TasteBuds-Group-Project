import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as groupActions from '../../store/groups'
import * as joinActions from '../../store/groups-events'
import EditGroupForm from "../SingleGroupEdit/EditForm";
import './SingleGroup.css'

const SingleGroup = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const sessionUser = useSelector(state => state.session.user)
  const groups = useSelector(state => state.groups[id]);
  const sessionEvents = useSelector(state => state.groupEvents)
  const events = Object.values(sessionEvents)

  console.log('HI', events)

  const ownerId = groups?.owner_id;


  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    dispatch(groupActions.loadGroupThunk(id))
    dispatch(joinActions.loadAllEventsThunk(id))
  }, [dispatch, id])

  return (
    <>
      <div>
        <div className="group_header">
        <div className="header_left">
          <img className="header_img" src={groups?.background_img} alt={groups?.name}/>
        </div>
        <div className="header_right">
          <h1>{groups?.name}</h1>
          <p>{groups?.city}, {groups?.state}</p>
            {sessionUser?.id === ownerId && (
              <>
              <button onClick={() => setShowEditForm(!showEditForm)}>Edit</button>
                {showEditForm && <EditGroupForm />}
              </>
            )}
        </div>
      </div>
      <div>
        {groups?.description}
      </div>
      <div className="groupEvents">
        <h3>Events</h3>
          {events.map((event, i) => (
            <a href={`/events/${event.id}`} key={i}>
              <ul>
                <li>{event?.date}</li>
                <li>{event?.title}</li>
                <li>{event?.description}</li>
                <li>{event?.location}</li>
              </ul>
            </a>
          ))}
      </div>
    </div>
    </>
  )
}

export default SingleGroup;
