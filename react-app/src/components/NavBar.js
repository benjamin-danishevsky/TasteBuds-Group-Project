
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
    <div className='nav-bar'>
      <nav>
        <ul>
          {sessionUser && (
            <li>
              <a href={`/home/${sessionUser?.id}`} >
                {sessionUser?.profile_pic ? <img src={sessionUser.profile_pic} className='pfp' style={{ height: '30px', borderRadius: '50%' }} /> : <BsPersonCircle className='pfp' style={{ fontSize: '30px' }} />}
              </a>
            </li>
          )}
          <li className='homeButton'>
            <NavLink to='/' exact={true} activeClassName='active'>
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
          <div className='search-bar' style={{ marginTop: '7px'}}>
            <SearchBar />
          </div>
          <div className='auth-routes'>
            <li style={{display:'inline-block', marginRight: '3.3px'}}>
              <LogoutButton />
            </li>
            <li style={{display:'inline-block', marginRight: '6.3px' }}>
              <LoginFormModal />
            </li>
            <li style={{display:'inline-block', marginLeft: '3.3px'}}>
              <SignUpFormModal />
            </li>
          </div>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
