import React, { Component } from 'react';

export default class NavBar extends Component {
	render(){
    if(this.props.user === "notloaded"){
      return <div className="loading-div"></div>
    }
    else {
      
    }

		return( 
        <div className="nav-shadow">
            <nav className="clearfix"> 
              <a href="/" id="react-logo"> </a>
              <img src="https://i.imgur.com/ibE1DjA.png" id="reactagram-logo" alt="https://i.imgur.com/ibE1DjA.png"/>
              {/*<div id="reactagram-logo"></div>*/}
              <a href="/users/:id" id="profile-photo"> </a>
            </nav>
        </div>
		)
	}
}

