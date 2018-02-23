import React, { Component } from 'react';
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

    //this.updatePreview = this.updatePreview.bind(this)
  }

  componentDidMount() {

    window.scrollTo(0, 0)
  
    //console.log('PROPS ==>', this.props);

    //console.log('user is in create post', this.props.userID);
    //console.log('user is in create post', this.props.userObj);

    // console.log('PROPS ==>', this.props);

    axios

      .get('/api/reactagram/posts')

      .then(response => {
        this.setState({ posts: response.data });

        //console.log('api data recieved ==>', this.state.posts);
      })

      .catch(err => {
        //console.log('err is:', err);
      });
  }

  handleChange(event) {

    //var imagelink = event.target.value

    event.preventDefault();

    //console.log('event.target.name', event.target.name);

    let key = event.target.name;

    this.setState({ [key]: event.target.value }, this.updatePreview);
    

    // this.setState({ `${event.target.name}`: event.target.value });

    // console.log(`STATE OF ${event.target.name} ===>`, event.target.value);
  }

  updatePreview(){

    const previewDiv = document.getElementsByClassName('image-preview');

    previewDiv[0].setAttribute('style', `background: url('${this.state.image_link}'); background-size: cover; background-position: center`)
  }

  handleSubmit(event) {
    // console.log('submit handles');

    event.preventDefault();

    if (this.state.image_link === '') {
      alert('Image and caption are required.');
    } else {
      axios

        .post('/api/reactagram/newpost', {
          image_link: this.state.image_link,

          caption: this.state.caption,

          user_id: this.props.userID
        })

        .then(response => {
          this.setState({ post: response.data });
            this.props.queryPosts2();
            

          //console.log('post posted ==>', this.state.post);
        })

        .catch(err => {
          //console.log('err is:', err);
        });
    }
  }

  render() {
    return (
      <section className="create-form-component">
      <div className="create-post-div">
        <div className="form-div">
          <h2 className="create-post-h2">New Post</h2>
            <div className="image-preview"></div>
          <form onSubmit={this.handleSubmit}>
            <label>
              <input type="text" name="image_link" onChange={this.handleChange} placeholder="Image URL"/>
            </label>

            <label>
              <p>Caption</p>
              <textarea type="text" name="caption" onChange={this.handleChange} />
            </label>

            <button type="submit">add comment</button>
          </form>
        </div>
        </div>
      </section>
    );
  }
}
