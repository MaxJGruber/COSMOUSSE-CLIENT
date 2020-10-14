import React from "react";
import ReactMapboxGl from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

class Home extends React.Component {
  state = {
    lng: 2.349014, // Default lng and lat set to the center of paris.
    lat: 48.864716,
    zoom: 12, // used for map zoom level
  };

  componentDidMount() {
    // Get users geo location and set it as the state so the map centers relative to the users current location. :)
    const success = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      this.setState({ lat: latitude, lng: longitude });
    };
  }

  render() {
    return (
      <div>
        <Map
          // eslint-disable-next-line
          style="mapbox://styles/mapbox/light-v10"
          zoom={[12]}
          containerStyle={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            height: "90%"
          }}
          center={[this.state.lng, this.state.lat]}
        ></Map>
      </div>
    );
  }
}

export default Home;
