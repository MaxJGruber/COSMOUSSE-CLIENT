import React from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import { withRouter } from "react-router-dom";

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
    selectedLng: null,
    selectedLat: null,
  };

  componentDidMount() {
    // Get users geo location and set it as the state so the map centers relative to the users current location. :)
    const success = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      this.setState({ lat: latitude, lng: longitude });
    };

    const error = () => {
      console.log("An error occured geolocating user");
    };

    if (!navigator.geolocation) {
      console.log("Geolocation not supported");
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }

  handleClick = (selectedItem) => {
    console.log(selectedItem);
    // Pass the selectedItem back to the parent.
    // this.props.handleSelectItem(selectedItem);
  };

  // handleTarget = (e) => {
  //   console.log(e.location);
  // };
  _onClickMap = (map, evt) => {
    console.log(evt.lngLat);
    var coordinates = evt.lngLat;
    console.log(coordinates.lat, coordinates.lng);
    this.setState({
      selectedLng: coordinates.lng,
      selectedLat: coordinates.lat,
    });
    this.props.history.push("/item");
  };

  render() {
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
            onClick={(event) => this.handleClick(item)}
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
        onClick={this._onClickMap}
        selectedCoordinates={[this.state.selectedLng, this.state.selectedLat]}
      >
        {beerLayer}
        {/* {CustomPopup()} */}
      </Map>
    );
  }
}

export default withRouter(AppMap);
