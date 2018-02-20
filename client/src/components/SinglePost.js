import React, { Component } from 'react';
import axios from 'axios';

export default class SinglePost extends Component{
  constructor(props){
    super(props)

    this.state = {poster: {},
                  loaded: false,
                  photoliked: false,
                 }
    this.grabPostersObj = this.grabPostersObj.bind(this);
  }

   grabPostersObj(){

    const posterProfile = this.props.postsData.find( i => {
        return i.id === this.props.match.params.id
      })

     axios({
      url: `http://localhost:3000/api/reactagram/users/${posterProfile.user_id}`,
      method: "get"
    }).then( response => {
      console.log("poster's profile found", response.data);
      this.setState({ poster: response.data,
                      loaded: true });
    });
  }

  componentDidMount(){
  }

  iLike(){
    axios({
      url: `http://localhost:3000/api/reactagram/users/`,
      method: "post",
      data: this.state.newLike
    }).then( response => {
      this.setState({photoliked: true });
    });
  }


  render(){
    if (this.props.postsData.length === 0){
      return(
       <div className="loading-div"></div>
       )
    }
    else {
     
      const photo = this.props.postsData.find( i => {
        return i.id === this.props.match.params.id 
      })

      var styles = {background: `url('${photo.image_link}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  };

      const posterID = this.props.users.find(user => {
        return Number(user.id) === photo.id
      })
    return(
      <div>
        <div className="single-post-container-div">
        <div className="single-post-image-div" style={styles}></div><div className="likes-and-comments"> <div className="likes-div"><p>{photo.total_likes}</p></div><div className="comments-div"><p></p></div>
          <p className="caption-text">{photo.caption}</p>
        </div>
        </div>
        <div className="new-post" onClick={this.iLike}>+</div>


      </div>
      )
  }}
}