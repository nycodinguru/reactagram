import React, { Component } from 'react';
import AddComment from './AddComments';
import ShowComments from './ShowComments';

class CommentContainer extends Component {
  constructor(props) {
    super(props);
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
          />
          Hi!
        </div>

        <div>
          <ShowComments allUserData={this.props.users} />
          Sup!
        </div>
      </div>
    );
  }
}

export default CommentContainer;
