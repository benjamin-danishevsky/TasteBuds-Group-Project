import { motion } from 'framer-motion';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const sessionUser = useSelector(state => state.session.user)

  const dispatch = useDispatch()
  const history = useHistory()
  const onLogout = async (e) => {
    history.push('/')
    await dispatch(logout());
  };

  return <motion.button style={{border: 'none', borderRadius: '20px', height: '2.3rem', width:'5rem', color:'white', backgroundColor:'#ff5607'}} hidden={!sessionUser} whileHover={{scale: 1.1}} whileTap={{scale: .9}} onClick={onLogout}>Logout</motion.button>;
};

export default LogoutButton;
