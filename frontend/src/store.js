//import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
// import rootReducer from './reducers'

// const initialState = {}
//=====NOT WORKING=======
// 
// const store = createStore(rootReducer, initialState, 
//     compose(
//         applyMiddleware(thunk), 
//         window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__()
//     )
// );
//===========WORKING=================
// const store = createStore(rootReducer, initialState, 
//     compose(
//         applyMiddleware(thunk)
//     )
// );

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'; //npm install --save-dev redux-devtools-extension
import thunk from 'redux-thunk';
import rootReducer from './reducers'
const initialState = {}

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);



export default store;


    