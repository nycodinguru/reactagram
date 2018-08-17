import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Login extends Component {
	constructor(props) {
		super(props);
	
		// set initial state
		this.state = {
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

	//   componentWillMount(){
	// 	document.body.style.overflow = 'hidden'
	//   }


	render(){
		return(
	<div className="signup-div">
		<h1>Log-in</h1>
			<form onSubmit={this.handleSubmit}>
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
        <button type="submit" value="Submit">Log-in</button>
      </form>
	  <Link to="/reactagram/signup"><button id="login-signup-button" type="submit" value="Submit" >Sign-up</button></Link>
	</div>
		);
	}
}