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
  }

  render() {
    // console.log('this is props in comment container ===> gr', this.props);
    // console.log('length. show state===> gr', this.state.showComments.length);
    return (
      <div className="comment-container">
        <div className="addComment-div">
          <AddComment
            postData={this.props.posts}
            allUserData={this.props.users}
            userID={this.props.userID}
            postId={this.props.match.params.id}
            getAllComments={this.props.getAllComments}
          />
        </div>

        <div>
          <ShowComments
            allUserData={this.props.users}
            match={this.props.match}
            showComments={this.props.showComments}
          />
        </div>
      </div>
    );
  }
}

export default CommentContainer;
