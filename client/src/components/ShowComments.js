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

  render() {
    if (this.state.loaded === false) {
      return <div className="loading-div" />;
    } else {
      const allComments = this.state.showComments.map(comment => {
        return <p>{comment.comment_text}</p>;
      });
      return (
        <div>
          <div>{allComments}</div>
        </div>
      );
    }
  }
}
