import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import * as groupActions from '../../store/groups'

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
        <div key={idx}>
          <a href={`/groups/${group.id}`}>
            <p>{group?.name}</p>
          </a>
        </div>
        </>
      ))}
    </div>
    </>
  )
}

export default Groups
