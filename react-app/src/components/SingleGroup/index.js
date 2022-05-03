import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import * as groupActions from '../../store/groups'

const SingleGroup = () => {

  const dispatch = useDispatch()

  const { id } = useParams();
  const groups = useSelector(state => state.groups[id]);
  console.log(groups, "DATAAAAAAAAAAAAAAAAAAAAAAAAA")


  useEffect(() => {
    dispatch(groupActions.loadGroupThunk(id))
  }, [dispatch, id])

  return (
    <>
      <div>
        <h1>{groups?.name}</h1>
      </div>
    </>
  )
}

export default SingleGroup
