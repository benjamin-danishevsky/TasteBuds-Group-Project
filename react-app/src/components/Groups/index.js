import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import * as groupActions from '../../store/groups'

const Groups = () => {

  const dispatch = useDispatch()

  useEffect(async () => {
    await dispatch(groupActions.loadAllGroups())
  }, [dispatch])

  const groups = useSelector(state => state.groups);
  const groupData = Object.values(groups)
  console.log(groupData)

  return (
    <>
    <div>
      {groupData.map((group, idx) => (
        <div key={idx}>
          <ul>
            <li>{group?.name}</li>
          </ul>
        </div>
      ))}
    </div>
    </>
  )
}

export default Groups
