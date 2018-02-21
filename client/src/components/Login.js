import React, { Component } from 'react';

export default class Login extends Component {
	render(){
		return(
			<section id="login-page">
				<div className="nav-shadow">
					<a href="/reactagram/login" id="react-logo"> </a>
					<img src="https://i.imgur.com/ibE1DjA.png" id="reactagram-logo" alt="https://i.imgur.com/ibE1DjA.png"/>
	        	</div>
	        	<div id="login-div">
					<h1>Welcome</h1>
				</div>
			</section>
		)
	}
}