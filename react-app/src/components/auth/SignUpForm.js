import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './modals.css'

const SignUpForm = ({showModal}) => {
  const [errors, setErrors] = useState([]);
  const [frontErrors, setFrontErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [profilePic, setProfilePic] = useState('')
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    const validateErrors = []
    if(!username) validateErrors.push("Username is required.")
    if(!email) validateErrors.push("Email is required.")
    if(!password) validateErrors.push("Password is required.")
    if(!repeatPassword) validateErrors.push("Confirmation Password is required.")
    if(password !== repeatPassword) validateErrors.push("Passwords must match.")
    if(validateErrors.length > 0){
      setFrontErrors(validateErrors)
      return
    }

    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, profilePic));
      if (data) {
        setErrors(data)
      }
    } else if (password !== repeatPassword) {
        return setErrors(['Passwords don\'t match. Please try again'])
    } else {
      }
    showModal(false)
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to={`/home/${user.id}`} />;
  }

  return (
    <form onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
        {frontErrors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className='signUpForm'>
        <img src="https://res.cloudinary.com/jameschenn/image/upload/v1652044476/Tastebuds/tastebuds2_ffox6e.png" alt="cute_logo" className="cute_logo" />
        <h2>Sign Up</h2>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label>User Name</label>
          <input
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div>
          <label>Email</label>
          <input
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div>
          <label>Profile Picture</label>
          <input
            type='input'
            name='profilePic'
            onChange={e => setProfilePic(e.target.value)}
            value={profilePic}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div>
          <label>Repeat Password</label>
          <input
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}

          ></input>
        </div>
        <button type='submit'>Sign Up</button>
      </div>
    </form>
  );
};

export default SignUpForm;
