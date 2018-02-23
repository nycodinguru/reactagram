import React, { Component } from 'react';

export default class Footer extends Component {
	render() {

		const codebrew = "< Codebrew />"

		return (
			<footer id="footer-div">
				<div className="contributors-nav">
					<ul>
						<li><a href="#" id="brand-copyright"> {codebrew} &copy; 2018</a></li>
						<li><a href="https://github.com/nycodinguru">Rashad Rose</a></li>
						<li><a href="https://github.com/NikoLewis">Niko Lewis</a></li>
						<li><a href="https://github.com/gregoryreyes">Gregory Reyes</a></li>
						<li><a href="https://github.com/linda88214">Yerim Hu</a></li>
					</ul>
				</div>
			</footer> 
		)
	}
}