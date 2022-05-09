import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as groupActions from '../../store/groups'
import * as joinActions from '../../store/groups-events'
import * as userJoinGroupActions from '../../store/users-in-groups';
import { motion } from "framer-motion";
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

  useEffect(() => {
    const allUsers = Object.values(userInGroup)
    allUsers.forEach(user => {
      if(user.id === sessionUser.id) {
        setInGroup(true)
      }
    })
  }, [userInGroup])

  const users = Object.values(userInGroup)
  let groupOnwer = users?.filter(user => user?.id === groups?.owner_id)
  console.log('TEST', groupOnwer)


  const ownerId = groups?.owner_id;


  const [showEditForm, setShowEditForm] = useState(false);


  useEffect(() => {
    dispatch(groupActions.loadGroupThunk(id))
    dispatch(joinActions.loadAllEventsThunk(id))
    dispatch(userJoinGroupActions.usersInGroupsThunk(id))
  }, [dispatch, id])

  return (
    <>
      <div>
        <div className="group_header">
          <div className="header_left">
            <img className="header_img" src={groups?.background_img} alt={groups?.name} />
          </div>
          <div className="header_right">
            <h1>{groups?.name}</h1>
            <p><i class="fa-solid fa-location-dot"></i> {groups?.city}, {groups?.state}</p>
            <p><i class="fa-solid fa-person"></i> {users?.length} members</p>
            <p><i class="fa-solid fa-user"></i> Oranized by <span style={{ fontWeight: "bold" }}>{groupOnwer[0]?.username}</span> </p>
            {sessionUser?.id === ownerId && (
              <>
                <motion.button className='button' whileHover={{ scale: 1.1 }} whileTape={{ scale: .9 }} onClick={() => setShowEditForm(!showEditForm)}>Edit</motion.button>
                {showEditForm && <EditGroupForm />}
              </>
            )}
            {inGroup
              ? <motion.button id="button" whileHover={{ scale: 1.1 }} whileTape={{ scale: .9 }} onClick={() => {
                setInGroup(false)
                dispatch(userJoinGroupActions.leaveGroupThunk(id, sessionUser))
              }}>Leave</motion.button>
              :
              <motion.button className='button' whileHover={{ scale: 1.1 }} whileTape={{ scale: .9 }} onClick={() => {
                setInGroup(true)
                dispatch(userJoinGroupActions.joinGroupThunk(id, sessionUser))
              }}>Join</motion.button>
            }
          </div>
        </div>

          <div>
            <h3>What we're about:</h3>
            {groups?.description}
          </div>
          <div className="groupEvents">
            <h3>Events ({events?.length})</h3>
            {events?.map((event, i) => (
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
        {inGroup && (
          <motion.button className='button' onClick={() => history.push(`/groups/${id}/new-event`)} whileHover={{ scale: 1.1 }} whileTap={{ scale: .9 }}>Create New Event</motion.button>
        )}
      </div>
    </>
  )
}
export default SingleGroup;
