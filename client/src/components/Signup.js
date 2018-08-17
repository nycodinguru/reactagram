import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Signup extends Component {
	constructor(props) {
		super(props);
	
		// set initial state
		this.state = {
			email: '',
			fname: '',
			lname: '',
		  username: '',
		  password: ''
		};
	
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	  }
	
	  // preventDefault and lift state back up to the parent
	  handleSubmit(e) {
		e.preventDefault();
		this.props.submit(this.state);
	  }
	
	  // update form state
	  handleChange(e) {
		const { name, value } = e.target
		this.setState({
		  [name]: value
		});
		}
		
		componentDidMount() {
			{window.scroll({
				top: 0,  
				behavior: 'smooth' 
			})
			}
		}

	render(){
		return(
	<div className="signup-div" id="sign-up">
		<h1>Signup</h1>
			<form onSubmit={this.handleSubmit}>
						<input
						placeholder="First Name" 
            type="text" 
            name="fname" 
            onChange={this.handleChange}
            value={this.state.fname} />
						<input
						placeholder="Last Name" 
            type="text" 
            name="lname" 
            onChange={this.handleChange}
            value={this.state.lname} />
					<input
						placeholder="Email" 
            type="text" 
            name="email" 
            onChange={this.handleChange}
            value={this.state.email} />
          <input
						placeholder="Username" 
            type="text" 
            name="username" 
            onChange={this.handleChange}
            value={this.state.username} />
          <input
						placeholder="Password" 
            type="password" 
            name="password" 
            onChange={this.handleChange}
            value={this.state.password} /><br/>
        <button type="submit" value="Submit">Submit</button>
      </form>
			<h3>Already have an account?</h3>
			<Link to="/reactagram/login">
				<button id="login-signup-button" type="submit" value="Submit" >Login</button>
			</Link>
	</div>
		);
	}
}