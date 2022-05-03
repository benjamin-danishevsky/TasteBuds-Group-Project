import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import * as groupActions from '../../store/groups'

const SingleGroup = () => {

  const dispatch = useDispatch()

  const { id } = useParams();
  const groups = useSelector(state => state.groups[id]);

  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    dispatch(groupActions.loadGroup(id))
  }, [dispatch, id])

  async function onClick(group) {
    await dispatch(groupActions.deleteGroupThunk(group))
  }

  return (
    <>
      <div>
        <h1>{groups?.name}</h1>
        <button type="button" onClick={()=> {
          onClick(groups.id)
        }}>Delete</button>
      </div>
    </>
  )
}

export default SingleGroup
