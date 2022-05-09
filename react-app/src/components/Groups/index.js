import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as groupActions from '../../store/groups'
import './Groups.css'
import { motion } from 'framer-motion';

const Groups = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [visibility, setVisibility] = useState(true)

  useEffect(async () => {
    await dispatch(groupActions.loadAllGroupsThunk())
  }, [dispatch])

  useEffect(() => {
    if (!sessionUser) {
      setVisibility(false)
    }
  }, [])

  const sessionUser = useSelector(state => state.session.user)
  const groups = useSelector(state => state.groups);
  const groupData = Object.values(groups)

  return (
    <>
      <h1 className='header'>All Groups</h1>
      <div>
        {groupData.map((group, idx) => (
          <>
            <div className="allGroups" key={idx}>
              <a href={`/groups/${group.id}`}>
                <ul>
                  <div className="allGroupsImg">
                    <img src={group.background_img} alt={group.name} style={{ height: "200px", width: "300px" }} />
                  </div>
                  <div className="allGroupsInfo grow">
                    <span style={{ fontWeight: "bold", fontSize: "30px", marginBottom: "20px" }}><li>{group?.name}</li></span>
                    <li>{group?.city}, {group?.state}</li>
                    <li>{group?.location}</li>
                    <li>{group?.description}</li>
                  </div>
                </ul>
              </a>
            </div>
          </>
        ))}
      </div>
      <motion.button
        style={{ backgroundColor: '#ff5607', border: 'none', borderRadius: '20px', height: '2.8em', width: '8rem', color: 'white', marginLeft: '5px', visibility: visibility ? 'visible' : 'hidden' }}
        onClick={() => history.push('/groups/new-group')}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: .9 }}
      >
        Create New Group</motion.button>
    </>
  )
}

export default Groups
