import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as groupActions from '../../store/groups'


function CreateGroup() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [backgroundImg, setbackgroundImg] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")

    const sessionUser = useSelector((state) => state.session.user)


    const handleSubmit = (e) => {
        e.preventDefault()

        const group = { userId: sessionUser.id, name, description, backgroundImg, city, state }

        dispatch(groupActions.createGroupThunk(group))

        history.push('/') //redirect to home after added
    }
    return (
        <section>
            <form className="createGroupForm" onSubmit={handleSubmit}>
                {/* <ul className="errors">
                    {errors.map((error, indx) => (
                        <li key={indx}>
                            {error}
                        </li>
                    ))}
                </ul> */}
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
                    value={backgroundImg}
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
