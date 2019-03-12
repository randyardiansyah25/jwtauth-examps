import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';

import store  from './store'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import SetAuthToken from './helper/authtoken';
import 'bootstrap/dist/css/bootstrap.min.css';
import { setCurrentUser, logoutUser } from './actions/authentication';

const jwtToken =localStorage.getItem("jwtToken")
console.log(`[app.js] Token : ${jwtToken}`);
if(localStorage.getItem("jwtToken")){
    SetAuthToken(jwtToken);
    const decoded = jwt_decode(jwtToken);
    console.log(`from app.js : ${JSON.stringify(decoded)}`);
    store.dispatch(setCurrentUser(decoded));

    const currentTime = Date.now() / 1000;
    if(decoded.exp < currentTime){
      store.dispatch(logoutUser());
      window.location.href = "/login";
    }
}

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <div>
            <Navbar />
            <Route exact path="/" component={ Home } />
            <div className="container">
              <Route exact path="/login" component={ Login }/>
              <Route exact path="/register" component={ Register }/>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;


