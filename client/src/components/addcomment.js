import React, { Component } from 'react';

export default class AddComment extends Component {
  constructor(props) {
    super(props);
    this.state = { comments: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    console.log('change handled');
  }
  handleSubmit(evnt) {
    console.log('submit handles');
  }

  render() {
    // const photos = this.props.photos.map(el => {
    //  return(
    //    <img src={el.url} className="post-photos" key={el.id}/>
    //)
    //})

    return (
      <div className="comment-form-component">
        <div>render comments here</div>
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
