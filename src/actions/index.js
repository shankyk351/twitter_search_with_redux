import axios from 'axios';

const havePostsAction = (data)=>{
    return {
        type: 'HAVE_POSTS',
        payload: data
    }
}

const showLoaderAction = (data)=>{
    return {
        type: 'SHOW_LOADER',
        payload: data
    }
}

const searchTextAction = (data) => {
    return {
        type: 'SEARCH_TEXT',
        payload: data
    }
}

const searchDataAction = (data) => {
    return {
        type: 'SEARCH_DATA',
        payload: data
    }
}

const internetIssueAction = (data) => {
    return {
        type: 'INTERNET_ISSUE',
        payload: data
    }
}

const httpRequestAction = (relativeURL, keyword)=>{
    return async (dispatch, getState)=>{
        if(keyword){
            await axios.get(`https://aravindtwitter.herokuapp.com/${relativeURL}`, {
                params: {
                    key: keyword
                }
            }).then((res)=>{
                dispatch(showLoaderAction(false));
                dispatch(havePostsAction(true));
                dispatch({type: 'FETCH_POSTS_SUCCESS', data: res});
            }).catch((err)=>{
                dispatch(showLoaderAction(false));
                dispatch(havePostsAction(false));
                dispatch({type: 'FETCH_POSTS_ERROR', data: err.message});
            })
        }else{
            dispatch(showLoaderAction(false));
            dispatch(havePostsAction(false));
            dispatch({type: 'FETCH_POSTS_ERROR', data: []})
        }
    }
}

export {havePostsAction, showLoaderAction, searchTextAction, 
        searchDataAction, internetIssueAction, httpRequestAction};

// export const setTimeAction = (data) => {
//     return {
//         type: 'SET_TIME',
//         payload: data
//     }
// }