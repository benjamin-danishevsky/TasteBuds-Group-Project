import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import * as groupActions from '../../store/groups'

const SingleGroup = () => {

  const dispatch = useDispatch()

  const { groupId } = useParams();
  const groups = useSelector(state => state.groups);
  console.log(groups, "DATAAAAAAAAAAAAAAAAAAAAAAAAA")
  const groupData = Object.values(groups)


  useEffect(async () => {
    await dispatch(groupActions.loadOneGroup(groupId))
  }, [dispatch, groupId])

  return (
    <>
      <div>
        <h1>{groupData.name}</h1>
      </div>
    </>
  )
}

export default SingleGroup
