import React, { Component } from 'react';
import axios from 'axios';

export default class SinglePost extends Component{
  constructor(props){
    super(props)

    this.state = {poster: {},
                  loaded: false}
    this.grabPostersObj = this.grabPostersObj.bind(this);
  }

   grabPostersObj(){

    const posterProfile = this.props.postsData.find( i => {
        return i.id === this.props.match.params.id
      })

      console.log(posterProfile.user_id)
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


  render(){
    if (this.props.postsData.length === 0){
      return(
       <div className="loading-div"></div>
       )
    }
    else {
      //this.grabPostersObj()
      const photo = this.props.postsData.find( i => {
        return i.id === this.props.match.params.id
      })

      var styles = {background: `url('${photo.image_link}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  };
    return(
      <div>
        <div className="single-post-container-div">
        <div className="single-post-image-div" style={styles}></div><div className="likes-and-comments"> <div className="likes-div"><p>{photo.total_likes}</p></div><div className="comments-div"><p></p></div>
          <p className="caption-text">{photo.caption}</p>
        </div>
        </div>


      </div>
      )
  }}
}