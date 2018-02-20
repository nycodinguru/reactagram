import React, { Component } from 'react';

export default class NavBar extends Component {
	render(){
		return(
            <nav className="clearfix"> 
              <a href="/" id="react-logo"> </a>
              <img src="https://i.imgur.com/ibE1DjA.png" id="reactagram-logo" alt="https://i.imgur.com/ibE1DjA.png"/>
              {/*<div id="reactagram-logo"></div>*/}
              <a href="/profile" id="profile-photo"> </a>
            </nav>
		)
	}
}
