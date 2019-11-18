import React, { useState } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import BubblePage from "./components/BubblePage";
import Login from "./components/Login";
import "./styles.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/">
          {localStorage.getItem("token") ? (
            <Redirect to="/bubbles" />
          ) : (
            <Login />
          )}
        </Route>
        <PrivateRoute path="/bubbles">
          <BubblePage />
        </PrivateRoute>
      </div>
    </Router>
  );
}

export default App;
