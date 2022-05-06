import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import './modals.css'
import {motion} from 'framer-motion'
import { useSelector } from 'react-redux';

function LoginFormModal() {
  const sessionUser = useSelector(state => state.session.user)
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <motion.button className='navButton' hidden={sessionUser} whileHover={{scale: 1.1}} whileTap={{ scale: .9}} onClick={() => setShowModal(true)}>Log In</motion.button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm showModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
