import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from "react-router-dom";
import * as searchActions from '../../store/search'
import { motion } from 'framer-motion';

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
        history.push('/search/results')
    }

    return (
        <>
            <form  onSubmit={handleSubmit}>
                <input
                    style={{borderRadius: '3px', borderColor:'lightgray'}}
                    type='text'
                    placeholder='Search for Events'
                    name='search'
                    onChange={e => setSearch(e.target.value)}
                    value={search}
                >
                </input>
                <motion.button  style={{backgroundColor: '#ff5607', border: 'none', borderRadius:'20px', height:'2.3em', width:'4rem', color:'white', marginLeft: '5px' }} whileHover={{scale: 1.1}} whileTap={{scale: .9}} type="submit" >Search</motion.button>
            </form>
        </>
    )
}

export default SearchBar
