import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import LogList from "./pages/Loglist";
import ItemCreate from "./pages/ItemCreate";
import ItemEdit from "./pages/ItemEdit";
import About from "./pages/About";
import { withRouter } from "react-router-dom";
import { withUser } from "./components/Auth/withUser";
import { UserContext } from "./components/Auth/UserContext";

class App extends React.Component {
  static contextType = UserContext;

  state = {
    coordinates: [],
    selectedItem: "",
    error: false,
  };

  _onClickMap = (map, evt) => {
    // console.log("EVENT!!!!!", evt.lngLat);
    // console.log("map!!!!!", map);
    const features = map.queryRenderedFeatures(evt.point);
    // console.log(features[0], "featurres");
    // console.log(UserContext);
    if (this.context.user === null) {
      this.props.history.push(`/signup`);
    } else if (features[0] === undefined) {
      console.log("You can't place anything here!");
      // } else if (features[0].source === "beers") {
      //   console.log("It's a beer!");
      //   console.log(features[0].properties);
      //   this.setState({ selectedItem: features[0].properties._id });
      //   this.props.history.push(`/item/${features[0].properties._id}/editpage`);
    } else if (features[0].source === "composite") {
      console.log("MAP!");
      console.log("EVENT!!!!!", evt.lngLat);
      this.setState({ coordinates: [evt.lngLat.lng, evt.lngLat.lat] });
      this.props.history.push(`/item/create`);
    }
  };

  render() {
    // const { context } = this.props;
    // console.log(context);
    return (
      <div className="App">
        <Switch>
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/about" component={About} />
          <ProtectedRoute exact path="/profile" component={Profile} />
          <Route exact path="/loglist" component={LogList} />
          <Route
            exact
            path="/"
            component={() => <Home onClickMap={this._onClickMap} />}
          />
          <Route
            exact
            path="/item/:id/editpage"
            component={ItemEdit}
            id={this.state.selectedItem}
          />
          <Route
            exact
            path="/item/create"
            component={() => (
              <ItemCreate coordinates={this.state.coordinates} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default withUser(withRouter(App));
