import React from "react";
import AppMap from "../components/AppMap";
import API from "../api/apiHandler";

class Home extends React.Component {
  state = { items: [] };

  componentDidMount() {
    API.getItems("/items").then((data) => {
      this.setState({ items: data });
    });
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <AppMap
          items={this.state.items}
          selectedCoordinates={this.props.coordinates}
        />
      </div>
    );
  }
}

export default Home;
