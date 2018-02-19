import React, { Component } from 'react';

export default class LandingPage extends Component {

	render(){

	// DISPLAYING ALL POSTS ON THE PAGE BY USING MAP
		if(this.props.posts.length === 0){
			return <div className="loading-div"></div>
		} 
		else {
			const posts = this.props.posts.map(el => {
				return(
					<div key={el.id} className="post-div">
						<img src={el.image_link} className="post-photos" alt={el.caption} />
					</div>
				)
			})			
		console.log("fmslmsfkl",posts)

		return(
			<section>
				<div id="all-posts"> 
					{/* NEED PROFILE PHOTO AND PROFILE NAME HERE */}
					{posts}
				</div>
			</section>
		)}
	}
}

