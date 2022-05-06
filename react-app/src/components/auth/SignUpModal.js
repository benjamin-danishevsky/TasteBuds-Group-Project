import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignUpForm from './SignUpForm';
import './modals.css'
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

function SignUpFormModal() {
  const sessionUser = useSelector(state => state.session.user)
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='navButtonDiv'>
      <motion.button className='navButton' hidden={sessionUser} whileHover={{scale: 1.1}} whileTap={{scale: .9}} onClick={() => setShowModal(true)}>Sign Up</motion.button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignUpForm showModal={setShowModal} />
        </Modal>
      )}
    </div>
  );
}

export default SignUpFormModal;
