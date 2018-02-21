import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class LandingPage extends Component {
    constructor(props) {
        super(props);

        this.goToCreatePost = this.goToCreatePost.bind(this);
    }

    goToCreatePost() {
        // console.log('these are props:', props);
        console.log('hi');
        // this.props.history.push('/newpost');
    }

    likeClicked() {
        console.log('like is clicked');
    }

    render() {
        // IF THE OBJECT IS EMPTY, DISPLAY LOADING IMAGE
        if (this.props.users === 'notloaded' || this.props.posts.length === 0) {
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
                };

                // IF USER_ID IN POSTS TABLE IS === TO ID IN USERS, DISPLAY PROFILE PICTURE AND USER NAME FROM USERS TABLE
                const posterID = this.props.users.find(user => {
                    return Number(user.id) === post_user;
                });
                // console.log("who are you: ",posterID)
                // console.log("what are you: ",post_user)

                return (
                    <div key={el.id} className="post-div">
                        <div className="user-profile">
                            <img
                                src={posterID.profile_picture}
                                className="profile-picture"
                                alt="posterID.profile_picture"
                            />
                            <p className="user-name">{posterID.username}</p>
                        </div>

                        <Link to={`/reactagram/posts/${el.id}`}>
                            {/* WHEN USER CLICKS ON THE IMAGE, IT LEADS THE USER TO THE SINGLE POST PAGE*/}
                            <div className="post-photos" style={styles} />
                        </Link>

                        <div>
                            <div className="button-div">
                                <div
                                    className="like-button"
                                    onClick={this.likeClicked}
                                />
                                <div className="like-count">
                                    {el.total_likes}
                                </div>
                                <div className="comment-button" />
                            </div>
                            <p className="post-caption">{el.caption}</p>
                        </div>
                    </div>
                );
            });
            // <div className="new-post" onClick={this.goToCreatePost}>+</div>;

            return (
                <section>
                    <div id="all-posts">{posts}</div>
                </section>
            );
        }
    }
}
