import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as groupActions from '../../store/groups'
import './Groups.css'
import { motion } from "framer-motion";

const Groups = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(async () => {
    await dispatch(groupActions.loadAllGroupsThunk())
  }, [dispatch])

  const groups = useSelector(state => state.groups);
  const groupData = Object.values(groups)
  
  return (
    <>
    <div>
      <motion.button style={{ margin: '5px', backgroundColor: '#ff5607', border:'none', borderRadius:'20px', height:'2.3rem', width: '10rem', color:'white'}} whileHover={{scale: 1.1}} whileTap={{scale: .9}} onClick={() => history.push('/groups/new-group')}>Create A New Group</motion.button>
      {groupData.map((group, idx) => (
        <>
        <div className ="allGroups" key={idx}>
          <a href={`/groups/${group.id}`}>
            <ul>
              <div className="allGroupsImg">
                <img src={group.background_img} alt={group.name} />
              </div>
              <div className="allGroupsInfo">
                  <span style={{fontWeight: "bold", fontSize: "30px", marginBottom: "20px"}}><li>{group?.name}</li></span>
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
    </>
  )
}

export default Groups
