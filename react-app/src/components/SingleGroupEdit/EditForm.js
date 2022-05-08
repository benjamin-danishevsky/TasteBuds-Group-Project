import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as groupActions from "../../store/groups";
import './EditForm.css'
import { motion} from "framer-motion";

const EditGroupForm = ({group, hideForm}) => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector(state => state.session.user)
  const sessionGroup = useSelector(state => state.groups[id])

  useEffect(async () => {
    await dispatch(groupActions.loadGroupThunk(id)
    )
  }, [dispatch])


  const [name, setName] = useState(sessionGroup?.name || "");
  const [description, setDescription] = useState(sessionGroup?.description || "");
  const [background_img, setBackground_img] = useState(sessionGroup?.background_img || "");
  const [city, setCity] = useState(sessionGroup?.city || "");
  const [state, setState] = useState(sessionGroup?.state || "");

  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  if(!sessionUser) {
    history.push(`/`)
  }

  const url = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/

 useEffect(() => {
   const errors = [];

   if(name.length > 50 || name.length < 1) errors.push('Name must be between 1 and 50 characters long');
   if(description.length < 1) errors.push("Please provide a description for your group")
   if (!(background_img.match(url))) errors.push("Please enter a valid URL for your image");
   if(city.length > 50 || city.length < 1) errors.push("Please enter a valid city")
   if(state.length > 50 || state.length < 2) errors.push("Plerase provide a valid state")
  setErrors(errors);
 }, [name, description, background_img, city, state])

  const handleSubmit = async e => {
    e.preventDefault();

    setHasSubmitted(true);

    if(errors.length > 0) return;

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
    <form className="EditGroupForm" onSubmit={handleSubmit}>
      <div className ="errorDiv">
        <ul className="errors">
          {hasSubmitted && errors.map((error, idx) => (
            <li key ={idx}>{error}</li>
          ))}
        </ul>
      </div>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="fieldText"
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="fieldText"
      />
      <input
        type="text"
        placeholder="Image"
        value={background_img}
        onChange={(e) => setBackground_img(e.target.value)}
        className="fieldText"
      />
      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="fieldText"
      />
      <input
        type="text"
        placeholder="State"
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="fieldText"
      />
      <motion.button whileHover={{scale:1.1}} whileTap={{scale: .9}} className="updateBtn" type="Submit">Edit Group</motion.button>
      <motion.button whileHover={{scale:1.1}} whileTap={{scale: .9}} type="button" onClick={() => {
        dispatch(groupActions.deleteGroupThunk(id))
        history.push('/groups')
      }}>Delete</motion.button>
    </form>
  </section>
)
}

export default EditGroupForm
