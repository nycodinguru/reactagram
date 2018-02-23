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

  // componentDidMount() {
  //   this.getAllComments();
  // }

  // getAllComments() {
  //   axios({
  //     method: 'get',
  //     url: 'http://localhost:3000/API/reactagram/comments'
  //   }).then(result => {
  //     this.setState({
  //       showComments: result.data,
  //       loaded: true
  //     });
  //   });
  // }

  render() {
    console.log('this is props in comment container ===> gr', this.props);
    console.log('length. show state===> gr', this.state.showComments.length);
    return (
      <div className="comment-container">
        <div>
          <AddComment
            postData={this.props.posts}
            allUserData={this.props.users}
            userID={this.props.userID}
            postId={this.props.match.params.id}
            getAllComments={this.props.getAllComments}
          />
          Hi!
        </div>

        <div>
          <ShowComments
            allUserData={this.props.users}
            match={this.props.match}
            showComments={this.props.showComments}
          />
          } Sup!
        </div>
      </div>
    );
  }
}

export default CommentContainer;
