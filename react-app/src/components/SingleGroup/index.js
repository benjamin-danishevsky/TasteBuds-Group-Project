import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as groupActions from '../../store/groups'
import * as joinActions from '../../store/groups-events'
import * as userJoinGroupActions from '../../store/users-in-groups';
import { motion } from "framer-motion";
import moment from "moment";
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
  const userInGroup = useSelector(state => state.usersJoinGroups)

  const [inGroup, setInGroup] = useState(false)
  const [visibility, setVisibility] = useState(true)

  useEffect(() => {
    const allUsers = Object.values(userInGroup)
    allUsers.forEach(user => {
      if (user.id === sessionUser.id) {
        setInGroup(true)
      }
    })
  }, [userInGroup])

  useEffect(() => {
    if (!sessionUser) {
      setVisibility(false)
    }
  }, [])




  const ownerId = groups?.owner_id;


  const [showEditForm, setShowEditForm] = useState(false);


  useEffect(() => {
    dispatch(groupActions.loadGroupThunk(id))
    dispatch(joinActions.loadAllEventsThunk(id))
    dispatch(userJoinGroupActions.usersInGroupsThunk(id))
  }, [dispatch, id])

  return (
    <>

      <div className="groupDiv">
        <div className="group_header">
          <div className="header_left">
            <img className="header_img" src={groups?.background_img} alt={groups?.name} style={{ height: "500px", width: "600px" }} />
          </div>
          <div className="header_right">
            <h1>{groups?.name}</h1>
            <p>Location: {groups?.city}, {groups?.state}</p>
            <p>About: {groups?.description}</p>
            {sessionUser?.id === ownerId && (
              <>
                <motion.button className='button' whileHover={{ scale: 1.1 }} whileTape={{ scale: .9 }} onClick={() => setShowEditForm(!showEditForm)}>Edit</motion.button>
                {showEditForm && <EditGroupForm />}
              </>
            )}
          </div>
        </div>
        <div className='groupButtons'>
          {inGroup
            ? <motion.button id="button" whileHover={{ scale: 1.1 }} whileTape={{ scale: .9 }} style={{ visibility: visibility ? 'visible' : 'hidden' }} onClick={() => {
              setInGroup(false)
              dispatch(userJoinGroupActions.leaveGroupThunk(id, sessionUser))
            }}>Leave Group</motion.button>
            :
            <motion.button className='button' whileHover={{ scale: 1.1 }} whileTape={{ scale: .9 }} style={{ visibility: visibility ? 'visible' : 'hidden' }} onClick={() => {
              setInGroup(true)
              dispatch(userJoinGroupActions.joinGroupThunk(id, sessionUser))
            }}>Join Group</motion.button>
          }
          {inGroup && (
            <motion.button className='button' style={{ visibility: visibility ? 'visible' : 'hidden', marginLeft: '15px' }} onClick={() => history.push(`/groups/${id}/new-event`)} whileHover={{ scale: 1.1 }} whileTap={{ scale: .9 }}>Create New Event</motion.button>
          )}
        </div>
        <div className="groupEvents">
          <h3 className="eventsHead">Upcoming Events ({events.length})</h3>
          {events?.map((event, i) => (
            <a href={`/events/${event.id}`} key={i}>
              <ul>
                <li style={{fontWeight:'bold', color:'orange'}} className="eventContent">{moment(event?.date).format('LLLL')}</li>
                <li className="eventTitle">{event?.title}</li>
                <li className="eventContent">{event?.description}</li>
                <li className="eventContent">{event?.location}</li>
              </ul>
            </a>
          ))}
        </div>
      </div>
    </>
  )
}
export default SingleGroup;
