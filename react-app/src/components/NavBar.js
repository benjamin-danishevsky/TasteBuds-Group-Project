
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from './auth/LogoutButton';
import LoginFormModal from './auth/LoginModal';
import SignUpFormModal from './auth/SignUpModal';
import SearchBar from './SearchBar';
import './NavBar.css';
import { BsPersonCircle } from 'react-icons/bs'

const NavBar = () => {

  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav>
      <div className='nav-bar'>
        <div className='nav-left'>
          <img src="https://res.cloudinary.com/dv3gxfdon/image/upload/v1652055057/TasteBudsFinal_ptiqvv.png" alt='tastebuds-logo' className='logo'/>
        <div className='home-container'>
            <li className='homeButton'>
              <NavLink to={`/home/${sessionUser?.id}`} exact={true} activeClassName='active'>
                Home
              </NavLink>
            </li>
            <li className='homeButton'>
              <NavLink to='/events' exact={true} activeClassName='active'>
                Events
              </NavLink>
            </li>
            <li className='homeButton'>
              <NavLink to='/groups' exact={true} activeClassName='active'>
                Groups
              </NavLink>
            </li>
        </div>
        </div>
        <div className='search-bar'>
          <SearchBar />
        </div>

          <ul>

          <div className='auth-routes'>
          {sessionUser && (
            <li>
              <a href={`/home/${sessionUser?.id}`} >
                {sessionUser?.profile_pic ? <img src={sessionUser.profile_pic} alt='profile-pic' className='pfp' /> : <BsPersonCircle style={{fontSize: '40px', marginRight: '15px'}} />}
              </a>
            </li>
          )}
            <li>
              <LogoutButton />
            </li>
            <li>
              <LoginFormModal />
            </li>
            <li>
              <SignUpFormModal />
            </li>
          </div>
        </ul>

    </div>
    </nav>
  );
}

export default NavBar;
