import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from "react-router-dom";
import * as searchActions from '../../store/search'

function SearchBar(){

    const [search, setSearch] = useState('')
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault()
        const payload = {
            search
        }
        dispatch(searchActions.submitSearchThunk(payload))
    }

    return (
        <>
            <h1>Search Bar</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='Search for Events'
                    name='search'
                    onChange={e => setSearch(e.target.value)}
                    value={search}
                >
                </input>
                <button type="submit" >Search</button>
            </form>
        </>
    )
}

export default SearchBar
