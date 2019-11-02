import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';

import combineAllReducers from './reducers/index';

import thunk from 'redux-thunk';


// const customMiddleware = store => next => action => {
//     if(action.type == "HAVE_POSTS"){
//         console.log('have post action called');
//     }
//     console.log('middleware 1 called');
// }

const store = createStore(
    combineAllReducers,
    applyMiddleware(thunk),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(()=>{
    console.log(store.getState());
})

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root')
)

