import React, { Component } from 'react';

// Check out the official documentation for more info:

// You can get access to the history object’s properties and the closest <Route>'s match via the withRouter higher-order component. withRouter will re-render its component every time the route changes with the same props as <Route> render props: { match, location, history }.

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // console.log('sup from handleclick =>');
    console.log('props are:', this.props);
    this.props.history.push('/reactagram');
    // <Redirect to="/" push />;
  }

  render() {
    if (!this.props.user) {
      return <div className="loading-div" />;
    } else {
      // console.log(this.props.user)
      const user = this.props.user.id;

      return (
        <div className="nav-shadow">
          <nav className="clearfix">
            <div onClick={this.handleClick} id="react-logo" />
            <img
              src="https://i.imgur.com/ibE1DjA.png"
              id="reactagram-logo"
              alt="https://i.imgur.com/ibE1DjA.png"
            />
            {/*<div id="reactagram-logo"></div>*/}
            <a href={`/reactagram/users/${user}`} id="profile-photo">
              {' '}
            </a>
          </nav>
        </div>
      );
    }
  }
}

export default NavBar;
