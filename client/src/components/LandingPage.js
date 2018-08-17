import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import alreadyLiked from '../images/liked.png';
import likes from '../images/likes.png';

export default class LandingPage extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        // IF THE OBJECT IS EMPTY, DISPLAY LOADING IMAGE
        if (this.props.users === null || this.props.posts.length === 0) {
            return <div className="loading-div" />;
        } else {
            // DISPLAYING ALL POSTS ON THE PAGE BY USING MAP
            const posts = this.props.posts.map(el => {
                var post_user = el.user_id;

                // USED CSS TO PUT POSTS IMAGES ON DIV BACKGROUND INSTEAD OF USING IMG TAG
                var styles = {
                    background: `url('${el.image_link}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)'
                };

                // IF USER_ID IN POSTS TABLE IS === TO ID IN USERS, DISPLAY PROFILE PICTURE AND USER NAME FROM USERS TABLE
                const posterID = this.props.users.find(user => {
                    return Number(user.id) === post_user;
                });

                const likedPost = this.props.userLikes.filter(i => {
                    if (i.postid === Number(el.id) && i.is_liked === true) {
                        return true;
                    } 
                    else {
                        return false;
                    }
                });

                return (
                    <div key={el.id} className="post-div">
                        <div className="user-profile">
                            <Link to={`/reactagram/users/${posterID.id}`}>
                                <img
                                    src={posterID.profile_picture}
                                    className="profile-picture"
                                    alt="posterID.profile_picture"

                                />
                            </Link>
                            <p className="user-name">{posterID.username}</p>
                        </div>

                        <Link to={`/reactagram/posts/${el.id}`} style={{ textDecoration: 'none' }}>
                            {/* WHEN USER CLICKS ON THE IMAGE, IT LEADS THE USER TO THE SINGLE POST PAGE*/}
                            <div className="post-photos" style={styles} > VIEW </div>
                        </Link>

                        <div>
                            <div className="button-div">

                                <div className={`"like-button ${likedPost.length > 0 ? Number(el.id) === likedPost[0].postid ? "liked" : "not-liked" : "not-liked"}`} >
                                </div>

                                <div className="like-count">
                                    {el.total_likes}
                                </div>
                                <div className="comment-button" />
                                <p className="landing-likes-count">{
                                    this.props.totalComments.filter(
                                        comment =>
                                            comment.p_id === parseInt(el.id)
                                    ).length
                                }</p>
                            </div>
                            <p className="post-caption">{el.caption}</p>
                        </div>
                    </div>
                );
            });

            return (
                <section style={{overflowX: "hidden"}}>
                    <div id="all-posts">{posts}</div>
                </section>
            );
        }
    }
}
