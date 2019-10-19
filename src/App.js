import React from 'react';
import './App.css';
import './loader.css';

import 'bootstrap/dist/css/bootstrap.min.css';

// service
import API from './services/api';

// components
import Search from './components/search/search';
import Listing from './components/listing/listing';
import SearchHeader from './components/searchHeader/searchHeader';



class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      searchData : [],
      searchText: '',
      time: 30,
      setTime: null,
      havePosts: false,
      showLoader: false,
      InternetIssue: false
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
    this.setState({
      showLoader: true,
      havePosts: true
    })
    API.get('/twittersearch', {
      params: {
        key: val
      }
    }).then((res)=>{
      console.log('res',res);
      if(res.data.statuses.length){
        this.setState({
          searchData: [...res.data.statuses],
          havePosts: true,
          InternetIssue: false,
          showLoader: false
        });
        this.timer();
      }else{
        this.setState({
          searchData: [],
          havePosts: false,
          showLoader: false
        })
      }
    }).catch((err)=>{
      console.log(err.message);
      if(err.message === "Network Error"){
        this.setState({
          InternetIssue: true,
          showLoader: false,
          havePosts: false
        })
      }
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
    
    const {searchData, time, havePosts, showLoader, InternetIssue} = this.state;
    
    return (
      <div className="App">
        <div className="container">
          <SearchHeader havePosts={havePosts} time={time} />
          <Search searchHandler={(e)=>this.submitSearch(e)} handleInputValue={(e)=>this.searchInputValue(e)}/>
          
          {/* listing */}
          {searchData.map((item, index)=>{
            return <Listing data={item} key={index} />
          })}
          {/* /listing */}

          {/* loader and error messages */}
          {showLoader&&<div className="loader"></div>}
          {(!havePosts && !InternetIssue) && <h3 style={{textAlign:'center'}}>No Posts available</h3>}
          {InternetIssue && <h4 style={{textAlign:'center'}}>Unable to fetch data due to No/Slow internet connection, Please Try Again!!!</h4>}
          {/* /loader and error messages */}

        </div> 
      </div>
    );
  }
}


export default App;
