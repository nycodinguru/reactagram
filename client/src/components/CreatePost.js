import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import axios from 'axios';

export default class CreatePost extends Component {
  //user_id is currently hardcoded
  // user_id: 1,
  // userID={this.state.id} userObj={this.state.userData}
  constructor(props) {
    super(props);

    this.state = {
      post: '',

      posts: '',

      image_link: '',

      caption: '',

      userObj: this.props.userData,

      profile_picture: '',

      username: ''
    };

    this.handleChange = this.handleChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log('PROPS ==>', this.props);

    console.log('user is in create post', this.props.userID);
    console.log('user is in create post', this.props.userObj);

    // console.log('PROPS ==>', this.props);

    axios

      .get('http://localhost:3000/api/reactagram/posts')

      .then(response => {
        this.setState({ posts: response.data });

        console.log('api data recieved ==>', this.state.posts);
      })

      .catch(err => {
        console.log('err is:', err);
      });
  }

  handleChange(event) {
    event.preventDefault();

    console.log('event.target.name', event.target.name);

    let key = event.target.name;

    this.setState({ [key]: event.target.value });

    // this.setState({ `${event.target.name}`: event.target.value });

    // console.log(`STATE OF ${event.target.name} ===>`, event.target.value);
  }

  handleSubmit(event) {
    // console.log('submit handles');

    if (this.state.image_link === '') {
      alert('Image and caption are required.');
    } else {
      axios

        .post('http://localhost:3000/api/reactagram/newpost', {
          image_link: this.state.image_link,

          caption: this.state.caption,

          user_id: this.props.userID
        })

        .then(response => {
          this.setState({ post: response.data });

          console.log('post posted ==>', this.state.post);
        })

        .catch(err => {
          console.log('err is:', err);
        });
    }
  }

  render() {
    return (
      <div className="post-form-component">
        <div />

        <form onSubmit={this.handleSubmit}>
          <label>
            Image:
            <input type="text" name="image_link" onChange={this.handleChange} />
          </label>

          <label>
            Caption:
            <input type="text" name="caption" onChange={this.handleChange} />
          </label>

          <button type="submit">add comment</button>
        </form>
      </div>
    );
  }
}
