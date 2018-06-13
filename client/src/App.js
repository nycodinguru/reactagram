import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import './App.css';
import axios from 'axios';

import NavBar from './components/NavBar';
import LandingPage from './components/LandingPage';
import LandingPageBackdrop from './components/LandingPageBackdrop';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import SinglePost from './components/SinglePost';
import AddComment from './components/AddComments';
import ShowComments from './components/ShowComments';
import CreatePost from './components/CreatePost';
import NewPostIcon from './components/NewPostIcon';
import CommentContainer from './components/CommentContainer';
import Footer from './components/Footer';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 1,
      allUserData: null,
      userData: null,
      postsData: '',
      likeData: null,
      showComments: [],
      loaded: false
    };

    this.getAllComments = this.getAllComments.bind(this);
    this.grabLikes = this.grabLikes.bind(this)
    this.queryPosts2 = this.queryPosts2.bind(this)
  }

  getAllComments() {
    //console.log('gettin them comments');
    axios({
      method: 'get',
      url: '/API/reactagram/comments'
    }).then(result => {
      this.setState({
        showComments: result.data,
        loaded: true
      });
    });
  }

  grabLikes() {
    const userid = this.state.userData.id;

    axios({
      url: `/api/reactagram/alluserlikes/${userid}`,
      method: 'get'
    }).then(response => {
      this.setState({ likeData: response.data });
    });
  }

  grabUserObj() {
    axios({
      url: `/api/reactagram/users/${this.state.id}`,
      method: 'get'
    }).then(response => {
      // console.log('grabUserObj: ', response.data);
      this.setState({ userData: response.data }, this.grabLikes);
    });
  }

  allUsers() {
    axios({
      url: '/api/reactagram/users',
      method: 'get'
    }).then(response => {
      // console.log('allUser: ', response.data);
      this.setState({ allUserData: response.data });
    });
  }

  queryPosts() {
    axios({
      url: '/api/reactagram/posts',
      method: 'get'
    }).then(response => {
      this.setState({ postsData: response.data });
    });
  }

  queryPosts2() {
    axios({
      url: '/api/reactagram/posts',
      method: 'get'
    }).then(response => {
      this.setState({ postsData: response.data });
    });
  }

  componentDidMount() {
    this.queryPosts();
    this.grabUserObj();
    this.allUsers();
    this.getAllComments();
  }

  render() {
    if (this.state.loaded === false || this.state.likeData === null || this.state.userData === null) return <center><h2 id="loading"> LOADING... </h2></center>
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={() => <Redirect to="/reactagram" />}
            />

            {/********************** ON HOLD SECTION **********************/}
            {/********************** LOGIN AND SIGNUP *********************/}
            <Route
              exact
              path="/reactagram/login"
              render={props => {
                return (
                  <div>
                    <div id="reactagram-logo" />
                    <Login />
                    <LandingPageBackdrop
                      {...props}
                      posts={this.state.postsData}
                      users={this.state.allUserData}
                    />
                  </div>
                );
              }}
            />

            <Route
              exact
              path="/signup"
              render={props => {
                return <Signup />;
              }}
            />

            {/************************* LANDING PAGE ************************/}
            {/***************************************************************/}
            <Route
              exact
              path="/reactagram"
              render={props => {
                let totalComments = this.state.showComments;
                //console.log('total comments gr ==>', this.state.showComments);
                return (
                  <div id="landingPage">
                    <NavBar {...props} user={this.state.userData} />
                    <LandingPage
                      {...props}
                      queryPosts2={this.queryPosts2}
                      userLikes={this.state.likeData}
                      posts={this.state.postsData}
                      users={this.state.allUserData}
                      totalComments={totalComments}
                    />
                    <NewPostIcon {...props} />
                    <Footer />
                  </div>
                );
              }}
            />

            {/************************* PROFILE PAGE ************************/}
            {/***************************************************************/}
            <Route
              exact
              path="/reactagram/users/:id"
              render={props => {
                return (
                  <div>
                    <NavBar {...props} user={this.state.userData} />
                    <Profile
                      {...props}
                      user={this.state.userData}
                      allUser={this.state.allUserData}
                      posts={this.state.postsData}
                      userLikes={this.state.likeData}
                    />
                    <NewPostIcon {...props} />
                    <Footer />
                  </div>
                );
              }}
            />

            {/*********************** SINGLE POST PAGE **********************/}
            {/***************************************************************/}
            <Route
              path="/reactagram/posts/:id"
              render={props => {
                let totalComments = this.state.showComments.filter(
                  comment => comment.p_id === parseInt(props.match.params.id)
                ).length;
                //console.log('total comments gr ==>', totalComments);
                console.log(this.state.userData)
                if (!this.state.userData || !this.state.postsData || !this.state.allUserData) return <div className="loading-div"></div>
                return (
                  <div>
                    <NavBar {...props} user={this.state.userData} />
                    <SinglePost
                      {...props}
                      queryPosts2={this.queryPosts2}
                      grabLikes={this.grabLikes}
                      user={this.state.userData}
                      users={this.state.allUserData}
                      postsData={this.state.postsData}
                      currentUserId={this.state.id}
                      userLikes={this.state.likeData}
                      totalComments={totalComments}
                    />

                    <LandingPageBackdrop
                      {...props}
                      posts={this.state.postsData}
                      users={this.state.allUserData}
                    />
                      <div className="comments-parent">
                      <CommentContainer
                      {...props}
                      posts={this.state.postsData}
                      users={this.state.allUserData}
                      userID={this.state.id}
                      showComments={this.state.showComments}
                      getAllComments={this.getAllComments}
                    />
                      </div>
                    <NewPostIcon {...props} />
                    <Footer />
                  </div>
                );
              }}
            />

          {/*********************** SINGLE POST PROFILE *********************/}
            {/***************************************************************/}
            <Route
              path="/reactagram/users/posts/:id"
              render={props => {
                let totalComments = this.state.showComments.filter(
                  comment => comment.p_id === parseInt(props.match.params.id)
                ).length;
                return (
                  <div>
                    <NavBar {...props} user={this.state.userData} />
                    <SinglePost
                      {...props}
                      grabLikes={this.grabLikes}
                      user={this.state.userData}
                      users={this.state.allUserData}
                      postsData={this.state.postsData}
                      currentUserId={this.state.id}
                      userLikes={this.state.likeData}
                      totalComments={totalComments}
                    />
                    <div style={{ filter: 'blur(3px)', position: 'relative', top: '-710px', height: '100vh', zIndex: '-1000' }}>
                    <Profile 
                      {...props}
                      user={this.state.userData}
                      allUser={this.state.allUserData}
                      posts={this.state.postsData}
                      userLikes={this.state.likeData}
                    />
                    </div>
                      <div className="comments-parent">
                      <CommentContainer
                      {...props}
                      posts={this.state.postsData}
                      users={this.state.allUserData}
                      userID={this.state.id}
                      showComments={this.state.showComments}
                      getAllComments={this.getAllComments}
                    />
                      </div>
                    <NewPostIcon {...props} />
                    <Footer style={{ position: 'absolute', bottom: '0'}}/>
                  </div>
                );
              }}
            />

            {/********************** COMMENT FORM PAGE **********************/}
            {/***************************************************************/}
            <Route
              exact
              path="/reactagram/commmentform"
              render={props => {
                return (
                  <div>
                    <NavBar {...props} user={this.state.userData} />
                  </div>
                );
              }}
            />

            {/*********************** SHOW COMMENTS PAGE **********************/}
            {/***************************************************************/}
            <Route
              exact
              path="/reactagram/showcomments"
              render={props => {
                return (
                  <div>
                    <NavBar {...props} user={this.state.userData} />
                    <SinglePost
                      {...props}
                      user={this.state.userData}
                      users={this.state.allUserData}
                      postsData={this.state.postsData}
                    />
                    <ShowComments
                      allUserData={this.state.allUserData}
                      showComments={this.state.showComments}
                    />
                    }
                    <LandingPageBackdrop
                      {...props}
                      posts={this.state.postsData}
                      users={this.state.allUserData}
                    />
                  </div>
                );
              }}
            />

            {/************************* NEW POST PAGE ***********************/}
            {/***************************************************************/}
            <Route
              exact
              path="/reactagram/newpost"
              render={props => {
                return (
                  <div>
                    <NavBar {...props} user={this.state.userData} />
                    <div className="landing-page-create-post">
                    <LandingPageBackdrop
                      {...props}
                      posts={this.state.postsData}
                      users={this.state.allUserData}
                    />
                    </div>
                      <div className="create-post">
                        <CreatePost
                      userID={this.state.id}
                      userObj={this.state.userData}
                        />
                      </div>
                  </div>
                );
              }}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
