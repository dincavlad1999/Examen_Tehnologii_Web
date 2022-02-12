import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/pages/Home";
import Participant from "./components/pages/Participants";
import Navbar from "./components/layout/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import ParticipantById from "./components/participant/ParticipantById";

function App() {
  return (
    <Router>
      <Fragment>
        <Navbar></Navbar>
        <section className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/movies" component={Home}></Route>
            <Route exact path="/participants" component={Participant}></Route>
            <Route
              exact
              path="/participants/:id"
              component={ParticipantById}
            ></Route>
          </Switch>
        </section>
      </Fragment>
    </Router>
  );
}

export default App;
