import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import * as groupActions from '../../store/groups'
import './SingleGroup.css'

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
        <div className="group_header">
        {console.log(groups)}
        <div className="header_left">
          <img className="header_img" src={groups?.background_img} alt={groups?.name}/>
        </div>
        <div className="header_right">
          <h1>{groups?.name}</h1>
          <p>{groups?.city}, {groups?.state}</p>
        </div>
      </div>
        <button type="button" onClick={()=> {
          onClick(groups.id)
        }}>Delete</button>
      <div>
        {groups?.description}
      </div>
    </div>
    </>
  )
}

export default SingleGroup
