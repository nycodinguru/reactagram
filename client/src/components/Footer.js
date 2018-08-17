import React, { Component } from 'react';

export default class Footer extends Component {
	render() {

		const codebrew = "< Codebrew />"

		return (
			<footer id="footer-div">
				<div className="contributors-nav">
					<ul>
						<li id="codebrew-footer"> {codebrew} &copy; 2018</li>
						<li><a href="https://github.com/nycodinguru" target="_blank">RASHAD ROSE</a></li>
						<li><a href="https://github.com/NikoLewis" target="_blank">NIKO LEWIS</a></li>
						<li><a href="https://github.com/gregoryreyes" target="_blank">GREGORY REYES</a></li>
						<li><a href="https://github.com/linda88214" target="_blank">YERIM HU</a></li>
					</ul>
				</div>
			</footer> 
		)
	}
}