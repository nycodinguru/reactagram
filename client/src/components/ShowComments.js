import React, { Component } from 'react';
import axios from 'axios';

export default class ShowComments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showComments: '',
      loaded: false
    };
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: 'http://localhost:3000/API/reactagram/comments'
    }).then(result => {
      this.setState({
        showComments: result.data,
        loaded: true
      });
    });
    console.log('=======>', this.state.showComments);
  }

  revealUsers() {
    axios({
      method: 'get',
      url: `http://localhost:3000/api/reactagram/users/`
    });
  }

  render() {
    if (this.props.allUserData === 'notloaded') {
      return <div className="loading-div" />;
    } else {
      const allComments = this.state.showComments.map((comment, key) => {
        var commenterId = comment.u_id;

        const posterID = this.props.allUserData.find(user => {
          return Number(user.id) === commenterId;
        });

        var styles = {
          background: `url('${posterID.profile_picture}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        };

        return (
          <div>
            <p key={key}>
              {comment.comment_text}
              {posterID.username}
              <div className="profile_picture" style={styles}>
                {' '}
              </div>
            </p>
          </div>
        );
      });
      return (
        <div>
          <div>{allComments}</div>
        </div>
      );
    }
  }
}
