import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as groupActions from '../../store/groups'
import './CreateGroupForm.css'

function CreateGroup() {
    const dispatch = useDispatch()
    const {id} = useParams()

    const history = useHistory()
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [background_img, setbackgroundImg] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [errors, setErrors] = useState([]);

    const sessionUser = useSelector((state) => state.session.user)
    const groups = useSelector(state => state.groups)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const validateErrors = [];
        if(!name) validateErrors.push('Group name is required.');
        else if(name.length < 3) validateErrors.push('Group name must be at least 3 characters.')
        else if(name.length > 50) validateErrors.push('Group name must be no more than 50 characters')

        if(!description) validateErrors.push('Group description is required.');
        else if(description.length < 5) validateErrors.push('Group description must be at least 5 characters.')

        if(!city) validateErrors.push('Group city is required.')

        if(!state) validateErrors.push('Group state is required.');
        if(!background_img) validateErrors.push('Group image is required.')
        if(validateErrors.length > 0){
            setErrors(validateErrors);
            return
        }

        const group = { owner_id: sessionUser.id, name, description, background_img, city, state }

        await dispatch(groupActions.createGroupThunk(group))

        history.push('/groups') //redirect to home after added
    }
    return (
        <section>
            <form className="createGroupForm" onSubmit={handleSubmit}>
                <ul className="create-group-errors-list">
                    {errors && errors.map((error) => (
                        <li className='error'key={error} style={{color: 'red'}}>{error}</li>
                    ))}
                </ul>
                <h2>Start a Group</h2>
                <div>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="fieldText"
                />
                </div>
                <div>
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="fieldText"
                />
                </div>
                <div>
                <input
                    type="text"
                    placeholder="Image"
                    value={background_img}
                    onChange={(e) => setbackgroundImg(e.target.value)}
                    className="fieldText"
                />
                </div>
                <div>
                <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="fieldText"
                />
                </div>
                <div>
                <input
                    type="text"
                    placeholder="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="fieldText"
                />
                </div>
                <div>
                <button className="updateBtn" type="Submit">Create Group</button>
                </div>
            </form>
        </section>
    )
}
export default CreateGroup;
