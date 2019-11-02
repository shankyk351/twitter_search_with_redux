import {combineReducers} from 'redux';

const havePostsReducer = (state=false, action)=>{
    switch(action.type){
        case 'HAVE_POSTS':
            return action.payload;
        default:
            return state;
    }
}

const showLoaderReducer = (state=false, action)=>{
    switch(action.type){
        case 'SHOW_LOADER':
            return action.payload;
        default:
            return state;
    }
}

const searchTextReducer = (state='', action)=>{
    switch(action.type){
        case 'SEARCH_TEXT':
            return action.payload;
        default:
            return state;
    }
}

const searchDataReducer = (state=[], action)=>{
    switch(action.type){
        case 'SEARCH_DATA':
            return action.payload;
        default:
            return state;
    }
}

const internetIssueReducer = (state=false, action)=>{
    switch(action.type){
        case 'INTERNET_ISSUE':
            return action.payload;
        default:
            return state;
    }
}

const httpRequestReducer = (state=[], action)=>{
    switch(action.type){
        case 'FETCH_POSTS_SUCCESS':
            return action.data;
        case 'FETCH_POSTS_ERROR':
            return action.data
        default:
            return state;
    }
}

// const setTimeReducer = (state=null, action)=>{
//     switch(action.type){
//         case 'SET_TIME':
//             return action.payload;
//         default:
//             return state;
//     }
// }

const combineAllReducers = combineReducers({
    havePostsReducer, showLoaderReducer, searchTextReducer, 
    searchDataReducer, internetIssueReducer, httpRequestReducer
});

export default combineAllReducers;