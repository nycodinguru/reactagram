import React, { Component } from 'react';

export default class Signup extends Component {
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

	render(){
		return(
	<div className="signup-div">
		<h1>Signup</h1>
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
        <button type="submit" value="Submit">Submit</button>
      </form>
	</div>
		);
	}
}