
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import LoginFormModal from './auth/LoginModal';
import SignUpFormModal from './auth/SignUpModal';
import SearchBar from './SearchBar';
import './NavBar.css';

const NavBar = () => {
  return (
    <div className='nav-bar'>
      <nav>
        <ul>
          <li>
            <NavLink to='/' exact={true} activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/users' exact={true} activeClassName='active'>
              Users
            </NavLink>
          </li>
          <div className='search-bar'>
            <SearchBar />
          </div>
          <div className='auth-routes'>
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
      </nav>
    </div>
  );
}

export default NavBar;
