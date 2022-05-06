import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './modals.css'

const LoginForm = ({showModal}) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      showModal(false)
    }

  };

  const onDemo = async (e) => {
    e.preventDefault();
    const data = await dispatch(login('demo@aa.io','password'));
    if (data) {
      setErrors(data);
    }
    showModal(false)
  }


  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to={`/home/${user.id}`} />;
  }

  return (
    <>
    <form className="loginForm" onSubmit={onLogin}>
      <h2>Log in</h2>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label htmlFor='email'>Email</label>
        <input
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
        <div className="formButtons">
          <button type='submit'>Login</button>
          <p>or</p>
          <button type="submit" className="demoBtn" onClick={onDemo}>Demo Login</button>
        </div>
      </div>
    </form>
     </>
  );
};

export default LoginForm;
