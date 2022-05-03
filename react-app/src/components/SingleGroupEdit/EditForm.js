import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as groupActions from "../../store/groups";

const EditGroupForm = ({group, hideForm}) => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();



  const sessionUser = useSelector(state => state.session.user)
  const sessionGroup = useSelector(state => state.groups[id])

  console.log('USER', sessionUser)
  console.log('GROUP', sessionGroup)

  useEffect(async () => {
    await dispatch(groupActions.loadGroup(id))
  }, [dispatch])


  const [name, setName] = useState(sessionGroup?.name || "");
  const [description, setDescription] = useState(sessionGroup?.description || "");
  const [background_img, setBackground_img] = useState(sessionGroup?.background_img || "");
  const [city, setCity] = useState(sessionGroup?.city || "");
  const [state, setState] = useState(sessionGroup?.state || "");


  const handleSubmit = async e => {
    e.preventDefault();

    const payload = {
      name,
      description,
      background_img,
      city,
      state
    }
    dispatch(groupActions.editGroupThunk(id, payload));
  }

return (
  <section>
    <form className="createGroupForm" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="fieldText"
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="fieldText"
      />
      <input
        type="text"
        placeholder="Image"
        value={background_img}
        onChange={(e) => setBackground_img(e.target.value)}
        required
        className="fieldText"
      />
      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
        className="fieldText"
      />
      <input
        type="text"
        placeholder="State"
        value={state}
        onChange={(e) => setState(e.target.value)}
        required
        className="fieldText"
      />
      <button className="updateBtn" type="Submit">Edit Group</button>
    </form>
  </section>
)
}

export default EditGroupForm
