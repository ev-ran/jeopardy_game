import React, { Component } from 'react';

//Import the Route component
import { Route, Switch } from "react-router-dom";

//Import the Navigation component
import Navigation from "./components/navigation/Navigation";

import './App.css';
import Welcome from './components/welcome/Welcome';
import Clock from './components/clock/Clock';
import Contact from './components/contact/Contact';
import Nothing404 from './components/nothing404/Nothing404';
import TestFetch from './components/testfetch/TestFetch'
import Jeopardy from './components/jeopardy/Jeopardy';


class App extends Component {
  render() {
    // let name = "Abracadabra";
    return (
      <div className="App">
        {/* render the Navigation component */}
        <Navigation />

        <Switch>

          {/* define our rotes */}

          {/* <Route exact path="/" render={(props) => <Welcome {...props} name="on root/home Page" />} /> */}

          <Route exact path="/" component={Jeopardy} />
          
          <Route exact path="/welcome" render={(props) => <Welcome {...props} name="! Welcome Everybody!" />} />

          <Route exact path="/welcome/:name"
            render={(props) => <Welcome {...props} name={props.match.params.name} />}
          />

          <Route path="/welcome/:name/:secondName"
            render={(props) => <Welcome {...props} name={props.match.params.name}
              secondName={props.match.params.secondName} />}
          />

          <Route  path="/clock" component={Clock} />
          <Route  path="/contact" component={Contact} />
          <Route path="/fetch" component={TestFetch}/>
          <Route path="/jeopardy" component={Jeopardy} />
          <Route path="*" component={Nothing404} />

        </Switch>

      </div>
    );
  }
}

export default App;
