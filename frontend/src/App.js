import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListMessageComponent from './components/ListMessageComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateMessageComponent from './components/CreateMessageComponent';
import ViewMessageComponent from './components/ViewMessageComponent';

function App() {
  return (
    <div>
        <Router>
              <HeaderComponent />
                <div className="container">
                    <Switch> 
                          <Route path = "/" exact component = {ListMessageComponent}></Route>
                          <Route path = "/messages" component = {ListMessageComponent}></Route>
                          <Route path = "/add-message/:id" component = {CreateMessageComponent}></Route>
                          <Route path = "/view-message/:id" component = {ViewMessageComponent}></Route>
                          {/* <Route path = "/update-message/:id" component = {UpdateMessageComponent}></Route> */}
                    </Switch>
                </div>
              <FooterComponent />
        </Router>
    </div>
    
  );
}

export default App;

