import React, { Component } from 'react';

export default class LandingPage extends Component {

	singlePost(){

	}

	render(){

// DISPLAYING ALL POSTS ON THE PAGE BY USING MAP
		if(this.props.users === "notloaded"){
			return <div className="loading-div"></div>
		} 
		else {
			const posts = this.props.posts.map(el => {
				var post_user = el.user_id
				// used css to put posts images on div background instead of using img tag
				var styles = {background: `url('${el.image_link}')`,
							backgroundSize: 'cover',
							backgroundPosition: 'center'}


			const posterID = this.props.users.find(user => {
				return Number(user.id) === post_user
			})

					// console.log("what are you: ",posterID)
					// console.log("who are you: ",post_user)
				

// if user_id in posts is === to id in users, display profile picture and user name from users
 	

				return(
					<div key={el.id} className="post-div" onClick={this.singlePost}>
						<div className="user_profile">
							<img src={posterID.profile_picture} className="profile_picture" alt="posterID.profile_picture"/>
							<p className="user_name">{posterID.username}</p>
						</div>
						<div className="post-photos" style={styles}></div>
						<p className="post-caption">{el.caption}</p>
					</div>
				)
			})			
		//console.log("fmslmsfkl",posts)

		return(
			<section>
				<div id="all-posts"> 
					{/* NEED PROFILE PHOTO AND PROFILE NAME HERE */}
					{posts}
					<div>

					</div>
				</div>
			</section>
		)}
	}
}

