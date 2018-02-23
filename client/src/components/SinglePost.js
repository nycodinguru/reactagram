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
      showButtons: false,
    };
    this.grabPostersObj = this.grabPostersObj.bind(this);
    this.likeHandler = this.likeHandler.bind(this);
    this.toggleButtons = this.toggleButtons.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.postOrPut = this.postOrPut.bind(this);
  }

  grabPostersObj() {
    const posterProfile = this.props.postsData.find(i => {
      return i.id === this.props.match.params.id;
    });

    axios({
      url: `http://localhost:3000/api/reactagram/users/${
        posterProfile.user_id
      }`,
      method: 'get'
    }).then(response => {
      console.log("poster's profile found", response.data);
      this.setState({
        poster: response.data,
        loaded: true
      });
    });
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  likeHandler() {
    const user_id = this.props.user.id;
    const postid = this.props.match.params.id;

    this.setState({
      user_id: user_id,
      postid: postid,
      is_liked: true
    },this.iLikeUpdate)
  }

  iLikeUpdate() {
    const is_liked = this.state.is_liked;
    const user_id = Number(this.state.user_id);
    const postid = this.state.postid;


    const newLikeData = {
      is_liked: is_liked,
      userid: user_id,
      postid: postid
    };

    axios({
      url: `http://localhost:3000/api/reactagram/likes/`,
      method: 'post',
      data: newLikeData
    }).then(response => {
      this.setState({ is_liked: true }, this.props.grabLikes)
    });
  }

  toggleButtons() {
    this.setState(prevState => {
      return {
        showButtons: !prevState.showButtons
      };
    });
  }

  deleteHandler() {
    const id = this.props.match.params.id;

    axios({
      url: `http://localhost:3000/api/reactagram/posts/${id}`,
      method: 'delete'
    }).then(response => {
      this.props.history.push('/reactagram');
    });
  }

   postOrPut(){
  //   const likedPost = this.props.userLikes.filter(i => {
  //     console.log("yoooooo", i.postid, this.props.match.params.id)
  //       if (i.postid === Number(this.props.match.params.id)) {
  //         return true}
  //       else { }
        
  //     });


  //       if (likedPost === true ){this.setState({is_liked: true})}
  //   })
   }

  render() {
    if (this.props.userLikes.length === 0) {
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
        backgroundPosition: 'center'
      };

      const likedPost = this.props.userLikes.filter(i => {
        if (i.postid === Number(photo.id) && i.is_liked === true ){
          return true;
        } else {
          return false;
        }
      });

      var styles = {
        background: `url('${photo.image_link}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      };

      var liked = {
        background: `url('https://i.imgur.com/HkYzJhT.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      };

      var like = {
        background: `url('https://i.imgur.com/lkJnRud.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      };

      return (
        <div className="single-post-parent-div">
          <div className="single-post-container-div">
            <div
              className="single-post-image-div"
              style={styles}
              onMouseOver={
                photo.user_id === this.props.currentUserId
                  ? this.toggleButtons
                  : null
              }
              onMouseLeave={
                photo.user_id === this.props.currentUserId
                  ? this.toggleButtons
                  : null
              }
            >
              {this.state.showButtons ? (
                <div
                  onMouseOver={
                    photo.user_id === this.props.currentUserId
                      ? this.toggleButtons
                      : null
                  }
                  onMouseLeave={
                    photo.user_id === this.props.currentUserId
                      ? this.toggleButtons
                      : null
                  }
                >
                  <ul className="delete-button">
                    <li className="edit-button-icon" />
                    <li className="delete-button-icon" />
                  </ul>
                </div>
              ) : (
                ''
              )}
            </div>
            <div className="likes-and-comments">
              {' '}
              <div
                className="likes-div"
                style={
                  likedPost.length > 0
                    ? Number(photo.id) === likedPost[0].postid ? liked : like
                    : like
                }
                onClick={this.likeHandler}
              >
                <p>{photo.total_likes}</p>
              </div>
              <div className="comments-div">
                <p>{this.props.totalComments} </p>
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
