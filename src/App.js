import React from 'react';
import './App.css';
import './loader.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import twitter from './twitter.svg';

// components
import Search from './components/search/search';
import Listing from './components/listing/listing';
import SearchHeader from './components/searchHeader/searchHeader';

// actions
import { 
         showLoaderAction, 
         havePostsAction, 
         searchTextAction, 
         searchDataAction,
         internetIssueAction,
         httpRequestAction
        } from './actions/index';

import { connect } from 'react-redux';



class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      time: 30,
      setTime: null,
      searchText: '',
      isBlank: false
    }
  }

  componentDidUpdate(prevProps){
    if(prevProps.httpRequestReducer !== this.props.httpRequestReducer){
      {this.props.httpRequestReducer.data &&
        this.props.httpRequestReducer.data.statuses &&
        this.props.httpRequestReducer.data.statuses.length &&
        this.timer()
      };
    }
  }

  // search form submit
  submitSearch(event){
    clearInterval(this.state.setTime);
    if(this.state.searchText){
      this.setState({
        time: 30,
        isBlank: false
      })
      this.getPostData(this.state.searchText);
    }else{
      this.props.havePostsAction(false);
      this.getPostData('');
      this.setState({
        isBlank: true,
        time: 30
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
      this.props.showLoaderAction(true);
      this.props.httpRequestAction('twittersearch', val);
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
    const {time, isBlank} = this.state;
    const { showLoaderReducer, havePostsReducer, httpRequestReducer, internetIssueReducer } = this.props;
    // console.log('httpRequestReducer.data', httpRequestReducer);
    return (
      <div className="App">
        <div className="container">
          {/* <img src={twitter} className="text-center" style={{'height': '50px', 'margin': '20px auto', 'display': 'block'}} alt=""/> */}
          <SearchHeader havePosts={havePostsReducer} time={time} />
          <Search searchHandler={(e)=>this.submitSearch(e)} handleInputValue={(e)=>this.searchInputValue(e)}/>
          {isBlank&&<p className="text-danger text-center">Please enter value to search</p>}
          
          {/* listing */}
          {httpRequestReducer.data && 
            httpRequestReducer.data.statuses &&
            httpRequestReducer.data.statuses.length && 
            httpRequestReducer.data.statuses.map((item, index)=>{
              return <Listing data={item} key={index} />
            })
          }
          
          {/* /listing */}

          {/* loader and error messages */}
          {showLoaderReducer &&
            <div className="loader-container">
              <div className="loader"></div>
            </div>
          }
          <div className="row justify-content-center">
            <div className="col-md-9">

              {httpRequestReducer.data && 
                httpRequestReducer.data.statuses &&
                !httpRequestReducer.data.statuses.length && 
                <div className="error-wrapper">
                    <img src={twitter} height="100" style={{'margin':'30px auto', 'display': 'block'}} alt="" />
                    <h3 style={{textAlign:'center'}}>No Result Found</h3>
                </div>
              }
              
              {httpRequestReducer&&
                httpRequestReducer.data&&
                httpRequestReducer.data.errors &&
                <div className="error-wrapper">
                  <img src={twitter} height="100" style={{'margin':'30px auto', 'display': 'block'}} alt="" />
                   <h3 className="text-center">{httpRequestReducer.data.errors[0].message}</h3>                
                </div>
              }

              {!isBlank && 
                typeof httpRequestReducer == 'string' &&
                <div className="error-wrapper">
                  <img src={twitter} height="100" style={{'margin':'30px auto', 'display': 'block'}} alt="" />
                  <h3 className="text-center">{httpRequestReducer}</h3>
                </div>
              }

              {!isBlank && 
                (!havePostsReducer && !internetIssueReducer) &&
                <div className="error-wrapper">
                  <img src={twitter} height="100" style={{'margin':'30px auto', 'display': 'block'}} alt="" />
                  <h3 style={{textAlign:'center'}}>No Posts available</h3>
                </div>
              }

              {!isBlank && 
                internetIssueReducer &&
                <div className="error-wrapper">
                  <img src={twitter} height="100" style={{'margin':'30px auto', 'display': 'block'}} alt="" />
                  <h4 style={{textAlign:'center'}}>Unable to fetch data due to No/Slow internet connection, Please Try Again!!!</h4>
                </div>
              }              
            </div>
          </div>
          {/* /loader and error messages */}
          

        </div> 
      </div>
    );
  }
}

const mapDispatchToProps = {
  showLoaderAction, havePostsAction, searchTextAction, 
  searchDataAction, internetIssueAction, httpRequestAction
};

const mapStateToProps = (state)=>{
  return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
