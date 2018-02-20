import React, { Component } from 'react';
import axios from 'axios';

export default class AddComment extends Component {
  constructor(props) {
    super(props);
    this.state = { comment: '', comments: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log('PROPS ==>', this.props);
    console.log('PROPS ==>');
    axios
      .get('http://localhost:3000/api/reactagram/comments')
      .then(response => {
        this.setState({ comments: response.data });
        console.log('api data recieved ==>', this.state.comments);
      })
      .catch(err => {
        console.log('err is:', err);
      });
  }

  handleChange(event) {
    this.setState({ comment: event.target.value });
    console.log('STATE OF COMMENT is ===>', this.state.comment);
  }
  handleSubmit(event) {
    // console.log('submit handles');
    axios
      .post('http://localhost:3000/api/reactagram/comments', {
        comment_text: this.state.comment,
        u_id: 1,
        p_id: 1,
      })
      .then(response => {
        this.setState({ comments: response.data });
        console.log('comment posted ==>', this.state.comment);
      })
      .catch(err => {
        console.log('err is:', err);
      });
  }

  render() {
    return (
      <div className="comment-form-component">
        <div />
        <form onSubmit={this.handleSubmit}>
          <label>
            Comment:
            <input type="text" name="comment" onChange={this.handleChange} />
          </label>
          <button type="submit">add comment</button>
        </form>
      </div>
    );
  }
}
