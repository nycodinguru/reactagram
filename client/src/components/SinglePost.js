import React, { Component } from 'react';
import axios from 'axios';

export default class SinglePost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      poster: {},
      loaded: false,
      user_id: '',
      postid: '',
      is_liked: false,
    };
    this.grabPostersObj = this.grabPostersObj.bind(this);
    this.likeHandler = this.likeHandler.bind(this);
  }

  grabPostersObj() {
    const posterProfile = this.props.postsData.find(i => {
      return i.id === this.props.match.params.id;
    });

    axios({
      url: `http://localhost:3000/api/reactagram/users/${
        posterProfile.user_id
      }`,
      method: 'get',
    }).then(response => {
      console.log("poster's profile found", response.data);
      this.setState({
        poster: response.data,
        loaded: true,
      });
    });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  likeHandler() {
    const user_id = this.props.user.id;
    const postid = this.props.match.params.id;

    this.setState({
      user_id: [user_id],
      postid: [postid],
      is_liked: true,
    });

    this.iLikeUpdate();
  }

  iLikeUpdate() {
    const is_liked = this.state.is_liked;
    const user_id = this.state.user_id;
    const postid = this.state.postid;

    const newLikeData = {
      is_liked: [is_liked],
      userid: [user_id],
      postid: [postid],
    };

    axios({
      url: `http://localhost:3000/api/reactagram/likes/`,
      method: 'post',
      data: newLikeData,
    }).then(response => {
      this.setState({ is_liked: true });
    });
  }

  render() {
    if (this.props.users === 'notloaded' || this.props.postsData.length === 0) {
      return <div className="loading-div" />;
    } else {
      const photo = this.props.postsData.find(i => {
        return i.id === this.props.match.params.id;
      });

      const posterID = this.props.users.find(user => {
        return Number(user.id) === photo.user_id;
      });

      var profilePic = {
        background: `url('${posterID.profile_picture}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };

      var styles = {
        background: `url('${photo.image_link}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };

      return (
        <div className="single-post-parent-div">
          <div className="single-post-container-div">
            <div className="single-post-image-div" style={styles} />
            <div className="likes-and-comments">
              {' '}
              <div className="likes-div" onClick={this.likeHandler}>
                <p>{photo.total_likes}</p>
              </div>
              <div className="comments-div">
                <p />
              </div>
              <p className="caption-text">{photo.caption}</p>
            </div>
            <div className="poster-info">
              <div className="post-profile-picture" style={profilePic} />
              <p className="post-username">{posterID.username}</p>
            </div>
          </div>
        </div>
      );
    }
  }
}
