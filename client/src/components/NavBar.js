import React, { Component } from 'react';

// Check out the official documentation for more info:

// You can get access to the history object’s properties and the closest <Route>'s match via the withRouter higher-order component. withRouter will re-render its component every time the route changes with the same props as <Route> render props: { match, location, history }.

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.goToProfile = this.goToProfile.bind(this);
    this.goToLogin = this.goToLogin.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);
  }

   goToProfile() {
    //console.log('props are:', this.props);
    this.props.history.push(`/reactagram/users/${this.props.user.id}`);
  }

  goToLogin() {
    //console.log('props are:', this.props);
    this.scrollToTop,
    this.props.history.push('/reactagram/login/');
  }

  handleClick() {
    // console.log('props are:', this.props);
    this.props.history.push('/reactagram');
  }

  scrollToTop() {
    {window.scroll({
      top: 0,  
      behavior: 'smooth' 
    })
    }
  }

  render() {
    if (this.props.loggedInStatus === "isLoggedIn") {
      return (
        <div className="nav-shadow">
          <nav className="clearfix">
            <div onClick={this.handleClick} id="react-logo" />
            <div id="reactagram-logo" onClick={this.scrollToTop}>
            </div>
            <div onClick={this.goToProfile} id="profile-photo">
            </div>
          </nav>
        </div>
      );
    }
    else{
      return (
        <div className="nav-shadow">
          <nav className="clearfix">
            <div onClick={this.handleClick} id="react-logo" />
            <div id="reactagram-logo" onClick={this.scrollToTop}>
            </div>
            <div onClick={this.goToLogin} id="profile-photo">
            </div>
          </nav>
        </div>
      );
    }
  }
}

export default NavBar;
