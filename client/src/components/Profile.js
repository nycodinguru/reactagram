import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Profile extends Component {
	render(){
		if(!this.props.user || this.props.posts.length === 0){
      		return <div className="loading-div"></div>
    	}
    	else {
    		const photo = this.props.user.profile_picture;
			const userName = this.props.user.username;
			const email = this.props.user.email;

// USING FILTER TO FIND ALL THE POSTS THAT CURRENT USER MADE BY MATCHING PARAMS OF THE ID NUMBER
			const posts = this.props.posts.filter(el => {
				if(el.user_id === Number(this.props.match.params.id)){
					// console.log('this users image: ', el)
					return el
				}
			})

			// console.log(posts)

			const eachPosts = posts.map((i, key) => {
				// console.log(i.image_link)

				var styles = {background: `url('${i.image_link}')`,
							backgroundSize: 'cover',
							backgroundPosition: 'center'}

// DISPLAYING ALL USER'S POSTS IN DIV URL
				return (
					<div className="profile-posts-div" key={key}>
						<div style={styles} className="my-posts"></div>
						<div>
							<div className="button-div">
								<div className="like-button" onClick={this.likeClicked}></div>
								<div className="like-count">{i.total_likes}</div>
								<div className="comment-button"></div>
							</div>
							<p className="post-caption">{i.caption}</p>
						</div>
					</div>
				)	
			})

			return(
				<section>
					<div id="profile-page" className="clearfix">
						<div id="profile-photo-div">
							<img src={photo} alt={photo} className="profile-photo"/>
						</div>

						<div id="profile-info-div">
							<div className="edit-button-div clearfix">
								<p className="user-name">{userName}</p>
								<Link to={`/reactagram/profile`}>
									<button className="edit-profile-button">Edit Profile</button>
								</Link>
							</div>
							<p className="user-email">{email}</p>
						</div>
					</div>
					<div id="profile-posts-section">
							{eachPosts}
					</div>
				</section>
			)
		}
	}
}