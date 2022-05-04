import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as groupActions from '../../store/groups'


function CreateGroup() {
    const dispatch = useDispatch()
    const {id} = useParams()

    const history = useHistory()
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [background_img, setbackgroundImg] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")

    const sessionUser = useSelector((state) => state.session.user)
    const groups = useSelector(state => state.groups)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const group = { owner_id: sessionUser.id, name, description, background_img, city, state }

        await dispatch(groupActions.createGroupThunk(group))

        history.push('/groups') //redirect to home after added
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
                    onChange={(e) => setbackgroundImg(e.target.value)}
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
                <button className="updateBtn" type="Submit">Create Group</button>
            </form>
        </section>
    )
}
export default CreateGroup;
