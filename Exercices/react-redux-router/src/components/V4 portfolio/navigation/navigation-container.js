import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class NavigationContainer extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className='nav-wrapper'>
        <div className='left-side'>
          <div className='nav-link-wrapper'>
            <NavLink exact to='/' activeClassName='nav-link-active'>
              Home peich
            </NavLink>
          </div>

          <div className='nav-link-wrapper'>
            <NavLink to='/about' activeClassName='nav-link-active'>
              About
            </NavLink>
          </div>

          <div className='nav-link-wrapper'>
           <NavLink to='/contact' activeClassName='nav-link-active'>
              Contact 
            </NavLink>
          </div>

          <div className='nav-link-wrapper'>
            <NavLink to='/blog' activeClassName='nav-link-active'>
              Blog
            </NavLink>
          </div>
        </div>
        <div className='right-side'>
          JASON RG
        </div>
{/*        <a href='/'>WrongHome</a> */}
{/*       <button>Contact</button>
        <button>Blog</button>
        {true ? <button>Add Blog</button> : null} */}
      </div>
    );
  }
}
