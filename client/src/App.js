import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import './App.css';
import axios from 'axios';

import NavBar from './components/NavBar';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import SinglePost from './components/SinglePost';
import AddComment from './components/addcomment';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 1,
      allUserData: "notloaded",
      userData: {},
      postsData: '',
    };
  }

  grabUserObj() {
    axios({
      url: `http://localhost:3000/api/reactagram/users/${this.state.id}`,
      method: 'get',
    }).then(response => {
      console.log(response.data);
      this.setState({ userData: response.data });
    });
  }

  allUsers(){
    axios({
      url: 'http://localhost:3000/api/reactagram/users',
      method: 'get'
    }).then(response => {
      console.log('allUser: ', response.data)
      this.setState({ allUserData: response.data });
    });
  }

  queryPosts() {
    axios({
      url: 'http://localhost:3000/api/reactagram/posts',
      method: 'get',
    }).then(response => {
      console.log(response.data);
      this.setState({ postsData: response.data });
    });
  }

  componentDidMount() {
    this.queryPosts();
    this.grabUserObj();
    this.allUsers();
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route
              exact path="/"
              render={() => <Redirect to="/reactagram" />}
            />

            {/********************** ON HOLD SECTION **********************/}
            {/********************** LOGIN AND SIGNUP *********************/}
            <Route
              exact path="/login"
              render={props => {
                return (
                  <div>
                    <div id="reactagram-logo" />
                    <LandingPage />
                    <Login />
                  </div>
                );
              }}
            />

            <Route
              exact path="/signup"
              render={props => {
                return <Signup />;
              }}
            />

            {/************************* LANDING PAGE ************************/}
            {/***************************************************************/}
            <Route
              exact path="/reactagram"
              render={props => {
                return (
                  <div id="landingPage">
                    <NavBar />
                    <LandingPage {...props} posts={this.state.postsData} users={this.state.allUserData}/>
                  </div>
                );
              }}
            />

            {/************************* PROFILE PAGE ************************/}
            {/***************************************************************/}
            <Route
              exact path="/profile"
              render={props => {
                return (
                  <div>
                    <NavBar />
                    <Profile />
                  </div>
                )
              }}
            />

            {/*********************** SINGLE POST PAGE **********************/}
            {/***************************************************************/}
            <Route
              path='/reactagram/posts/:id'
              render={props => {
                return(
                  <div>
                    <NavBar />
                    <SinglePost {...props} postsData={this.state.postsData}/>
                  </div>
                  )
              }}
            />

            <Route
              exact path="/commmentform"
              render={props => {
                return (
                  <div>
                    <NavBar />
                    <AddComment />
                  </div>
                )
              }}
            />

          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
