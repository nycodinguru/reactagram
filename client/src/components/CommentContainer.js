import React, { Component } from 'react';
import AddComment from './AddComments';
import ShowComments from './ShowComments';
import axios from 'axios';

class CommentContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showComments: '',
      loaded: false
    };

    this.getAllComments = this.getAllComments.bind(this);
  }

  componentDidMount() {
    this.getAllComments();
  }

  getAllComments() {
    axios({
      method: 'get',
      url: 'http://localhost:3000/API/reactagram/comments'
    }).then(result => {
      this.setState({
        showComments: result.data,
        loaded: true
      });
    });
  }

  render() {
    console.log('this is props in comment container=>', this.props);
    return (
      <div className="comment-container">
        <div>
          <AddComment
            postData={this.props.posts}
            allUserData={this.props.users}
            userID={this.props.userID}
            postId={this.props.match.params.id}
            getAllComments={this.getAllComments}
          />
          Hi!
        </div>

        <div>
          <ShowComments
            allUserData={this.props.users}
            match={this.props.match}
            showComments={this.state.showComments}
          />
          } Sup!
        </div>
      </div>
    );
  }
}

export default CommentContainer;
