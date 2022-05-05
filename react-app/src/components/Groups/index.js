import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import * as groupActions from '../../store/groups'
import './Groups.css'

const Groups = () => {

  const dispatch = useDispatch()

  useEffect(async () => {
    await dispatch(groupActions.loadAllGroupsThunk())
  }, [dispatch])

  const groups = useSelector(state => state.groups);
  const groupData = Object.values(groups)

  return (
    <>
    <div>
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
