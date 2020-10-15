import React from "react";
import { Switch, Route } from "react-router-dom";
import NavMain from "./components/NavMain";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import LogList from "./pages/Loglist";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <Route exact path="/loglist" component={LogList} />
        <Route exact path="/" component={Home} />
      </Switch>
      <NavMain />
    </div>
  );
}

export default App;
