import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import * as groupActions from '../../store/groups'
import EditGroupForm from "../SingleGroupEdit/EditForm";
import './SingleGroup.css'

const SingleGroup = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const sessionUser = useSelector(state => state.session.user)
  const groups = useSelector(state => state.groups[id]);

  console.log("GROUPS", groups)
  const ownerId = groups?.owner_id;
  console.log('OWNER', sessionUser)

  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    dispatch(groupActions.loadGroup(id))
  }, [dispatch, id])

  return (
    <>
      <div>
        <div className="group_header">
        <div className="header_left">
          <img className="header_img" src={groups?.background_img} alt={groups?.name}/>
        </div>
        <div className="header_right">
          <h1>{groups?.name}</h1>
          <p>{groups?.city}, {groups?.state}</p>
            {sessionUser?.id === groups?.id && (
              <>
              <button onClick={() => setShowEditForm(!showEditForm)}>Edit</button>
                {showEditForm && <EditGroupForm />}
              </>
            )}
        </div>
      </div>
      <div>
        {groups?.description}
      </div>
    </div>
    </>
  )
}

export default SingleGroup
