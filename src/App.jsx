import React from "react";
import { Switch, Route } from "react-router-dom";
// import NavMain from "./components/NavMain";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import LogList from "./pages/Loglist";
// import ItemForm from "./components/Forms/ItemForm";
import ItemCreate from "./pages/ItemCreate";
import ItemEdit from "./pages/ItemEdit";
import { withRouter } from "react-router-dom";


class App extends React.Component {
  state = {
    coordinates: [],
  };

  _onClickMap = (map, evt) => {
    // console.log("EVENT!!!!!", evt.lngLat);
    // console.log("map!!!!!", map);
    var coordinates = evt.lngLat;
    console.log(coordinates.lat, coordinates.lng);
    this.setState({
      coordinates: [coordinates.lng, coordinates.lat],
    });
    this.props.history.push("/item/create");
  };

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <ProtectedRoute exact path="/profile" component={Profile} />
          <Route exact path="/loglist" component={LogList} />
          <Route
            exact
            path="/"
            component={() => <Home onClickMap={this._onClickMap} />}
          />
          {/* <Route
            exact
            path="/item"
            component={() => <ItemForm coordinates={this.state.coordinates} />}
          /> */}
          <Route
            exact
            path="/item/create"
            component={() => (
              <ItemCreate coordinates={this.state.coordinates} />
            )}
          />
          <Route exact path="/item/:id/editpage" component={ItemEdit} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
