import React, { Component } from 'react';

export default class Profile extends Component {
	render(){
		if(!this.props.user || this.props.posts.length === 0){
      		return <div className="loading-div"></div>
    	}
    	else {
    		const photo = this.props.user.profile_picture;
			const userName = this.props.user.username;
			const email = this.props.user.email;
			// const id = this.props.user.id;

			const posts = this.props.posts.map(el => {
				if(el.user_id === Number(this.props.match.params.id)){
					console.log('this users image: ', el.image_link)
					return el.image_link
				}
				else {
					console.log('other users image: ', el.image_link)
				}
				return Number(this.props.match.params.id) === el.user_id
			})

			console.log(posts)

			var styles = {background: `url('${posts}')`,
							backgroundSize: 'cover',
							backgroundPosition: 'center'}

			return(
				<section id="profile-page">
					<div>
						<img src={photo} alt={photo}/>
						<p>{userName}</p>
					</div>

					<div>
						<p>{email}</p>

					</div>

					<div>
						<div style={styles} className="my-posts"></div>
					</div>

				</section>
			)
		}
	}
}