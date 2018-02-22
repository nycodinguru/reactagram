import React, { Component } from 'react';

class NewPostIcon extends Component {
  constructor(props) {
    super(props);
    this.goToCreatePost = this.goToCreatePost.bind(this);
  }

  goToCreatePost() {
    console.log('props are:', this.props);
    this.props.history.push(`/reactagram/newpost`);
  }

  render() {
    return (
      <div className="new-post" onClick={this.goToCreatePost}>
        +
      </div>
    );
  }
}

export default NewPostIcon;
