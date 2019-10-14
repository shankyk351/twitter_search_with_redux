import React from 'react';
import './App.css';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';



class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      searchData : [],
      searchText: '',
      time: 30,
      setTime: null,
      havePosts: false
    }
  }

  // search form submit
  submitSearch(event){
    clearInterval(this.state.setTime);
    if(this.state.searchText){
      this.setState({
        time: 30
      })
      this.getPostData(this.state.searchText);
    }else{
      this.setState({
        searchData: [],
        havePosts: false
      })
    }
    event.preventDefault();
  }

  // set search input value to searchText
  searchInputValue(e){
    this.setState({
      searchText: e.target.value
    })
  }

  // get post data
  getPostData(val){
    axios.get('https://aravindtwitter.herokuapp.com/twittersearch', {
      params: {
        key: val
      }
    }).then((res)=>{
      console.log('res',res);
      this.setState({
        searchData: [...res.data.statuses],
        havePosts: true
      });
      this.timer();
    }).catch((err)=>{
      console.log(err.message);
    })
  }

  // execute reset timer
  timer(){
      this.state.setTime = setInterval(()=>this.refreshTimer(), 1000);
  }

  // refresh timer logic
  refreshTimer(){
    if(this.state.time >= 1){
        this.setState({
          time: this.state.time - 1
        })
    }else{
      clearInterval(this.state.setTime);
      this.setState({
        time: 30
      })
      this.getPostData(this.state.searchText);
    }
  }

  render(){
    const {searchData, searchText, time, havePosts} = this.state;
    const listItem = searchData.map((item, index)=>{
      return (
        <div className="col-lg-12 col-md-6" key={index}>
          <div className="media p-3 card-item">
            <img src={item.user.profile_image_url} alt="" className="mr-3 rounded-circle" style={{"width":"60px"}} />
            <div className="media-body">
              <h4 className="post-title">
                {item.user.name}
                <span className="user-id">@{item.user.screen_name} </span>
                <small><i>{item.created_at}</i></small>
              </h4>
              <p>{item.text}</p>
            </div>
          </div>
        </div>
      )
    })
    return (
      <div className="App">
        <div className="container">
          <div className="refresh-time">
            <p>Search @ Twitter</p>
            {havePosts && <p>Auto refresh in {time} seconds</p>}
          </div>
          {/* search */}
          <div className="row justify-content-center">
            <div className="col-md-9">
              <form onSubmit={(event)=>this.submitSearch(event)}>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" onChange={(e)=>this.searchInputValue(e)} placeholder="Search" />
                  <div className="input-group-append">
                    <button type="submit" className="input-group-text search-btn">Search</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/* /search */}

          {/* list */}
          <div className="row">
            {listItem}
          </div>
          {!havePosts && <h3 style={{textAlign:'center'}}>No Posts available</h3>}
          {/* /list */}

        </div> 
      </div>
    );
  }
}



export default App;
