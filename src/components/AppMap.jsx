import React from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import { withRouter } from "react-router-dom";
// import { usePosition } from 'use-position';

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

const beerImg = new Image(20, 30);
beerImg.src = "../.././pint.svg";

class AppMap extends React.PureComponent {
  state = {
    lng: 2.349014, // Default lng and lat set to the center of paris.
    lat: 48.864716,
    zoom: 12, // used for map zoom level
  };

  componentDidMount() {
    // Get users geo location and set it as the state so the map centers relative to the users current location. :)
    const success = (position) => {
      console.log("hello");
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(latitude, longitude);
      this.setState({ lat: latitude, lng: longitude });
    };

    const error = () => {
      console.log("An error occured geolocating user");
    };

    // console.log(navigator.geolocation.getCurrentPosition);
    if (!navigator.geolocation) {
      console.log("Geolocation not supported");
    } else {
      console.log("Geolocation permitted");
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }

  handleClick = (selectedItem) => {
    console.log("########", selectedItem._id);
  };

  // handleTarget = (e) => {
  //   console.log(e.location);
  // };
  // _onClickMap = (map, evt) => {
  //   console.log(evt.lngLat);
  //   var coordinates = evt.lngLat;
  //   console.log(coordinates.lat, coordinates.lng);
  //   this.setState({
  //     selectedLng: coordinates.lng,
  //     selectedLat: coordinates.lat,
  //   });
  // this.props.history.push("/");
  // };

  render() {
    // console.log(">>>>>>>>>>", this.props);
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
            id={item._id}
            onClick={() => this.handleClick(item)}
            coordinates={item.location.coordinates}
          />
        ))}
      </Layer>
    );
    // const CustomPopup = () => {
    //   return (
    //     <Popup
    //       latitude={this.state.selectedLat}
    //       longitude={this.state.selectedLng}
    //       closeButton={true}
    //       closeOnClick={false}
    //       offsetTop={-30}
    //     ></Popup>
    //   );
    // };

    return (
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
        }}
        center={[this.state.lng, this.state.lat]}
        // onClick={(p1,p2) => console.log(p1,p2)}
        onClick={(p1, p2) => this.props.onClickMap(p1, p2)}
        // selectedCoordinates={[this.state.selectedLng, this.state.selectedLat]}
      >
        {beerLayer}
        {/* {CustomPopup()} */}
      </Map>
    );
  }
}

export default withRouter(AppMap);
