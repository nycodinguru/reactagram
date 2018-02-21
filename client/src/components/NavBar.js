import React, { Component } from 'react';

export default class NavBar extends Component {
	render(){
    if(!this.props.user){
      return <div className="loading-div"></div>
    }
    else {
      // console.log(this.props.user)
      const user = this.props.user.id

		return( 
        <div className="nav-shadow">
            <nav className="clearfix"> 
              <a href="/" id="react-logo"> </a>
              <img src="https://i.imgur.com/ibE1DjA.png" id="reactagram-logo" alt="https://i.imgur.com/ibE1DjA.png"/>
              {/*<div id="reactagram-logo"></div>*/}
              <a href={`/reactagram/users/${user}`} id="profile-photo"> </a>
            </nav>
        </div>

		)
  }
	}
}

