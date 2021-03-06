import React from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import { withRouter } from "react-router-dom";
import Popup from "./Popup";
import "../styles/Popup.css";

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

const beerImg = new Image(30, 30);
beerImg.src = "../.././pint.svg";

const userIcon = new Image(30, 30);
userIcon.src = "../.././Pin.png";

class AppMap extends React.PureComponent {
  state = {
    lng: 2.349014, // Default lng and lat set to the center of paris.
    lat: 48.864716,
    zoom: 12, // used for map zoom level
    selectedCoordinates: { selectedLat: null, selectedLng: null },
    selectedBeer: null,
    open: false,
  };

  componentDidMount() {
    // Get users geo location and set it as the state so the map centers relative to the users current location. :)
    const success = (position) => {
      console.log("success!");
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      // console.log(latitude, longitude);
      this.setState({
        selectedCoordinates: { selectedLng: longitude, selectedLat: latitude },
      });
      // console.log(this.state.selectedCoordinates);
    };

    const error = () => {
      console.log("An error occured geolocating user");
    };

    navigator.geolocation.getCurrentPosition(
      function () {},
      function () {}
    );
    if (!navigator.geolocation) {
      console.log("Geolocation not supported");
    } else {
      console.log("Geolocation permitted");
      navigator.geolocation.getCurrentPosition(success, error, {
        enableHighAccuracy: true,
        timeout: 10000,
      });
    }
  }

  open = (item) => {
    console.log("open");
    this.setState({ open: true, selectedBeer: item });
  };
  close = () => this.setState({ open: false });

  render() {
    // console.log(this.props.items.map((item) => item));
    // console.log(this.state.lat, this.state.lng);

    const beerLayer = (
      <Layer
        type="symbol"
        id="beers"
        images={["beer-icon", beerImg]}
        layout={{ "icon-image": "beer-icon" }}
      >
        {this.props.items.map((item, index) => (
          <Feature
            key={index}
            properties={{ ...item }}
            id={item._id}
            coordinates={item.location.coordinates}
            onClick={() => this.open(item)}
          ></Feature>
        ))}
      </Layer>
    );

    const userLayer = (
      <Layer
        type="symbol"
        id="user"
        images={["user-icon", userIcon]}
        layout={{ "icon-image": "user-icon" }}
      >
        <Feature
          coordinates={[
            this.state.selectedCoordinates.selectedLng,
            this.state.selectedCoordinates.selectedLat,
          ]}
        />
      </Layer>
    );

    return (
      <>
        <Map
          // eslint-disable-next-line
          style="mapbox://styles/mapbox/streets-v11"
          zoom={[12]}
          containerStyle={{
            width: "100%",
            height: "100%",
          }}
          center={[this.state.lng, this.state.lat]}
          onClick={(p1, p2) => this.props.onClickMap(p1, p2)}
        >
          {beerLayer}
          {userLayer}
          {this.state.open && (
          <Popup
            properties={{ ...this.state.selectedBeer }}
            onCancel={this.close}
          />
        )}
        </Map>
      </>
    );
  }
}

export default withRouter(AppMap);
