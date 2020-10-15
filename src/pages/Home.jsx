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
    return (
      <div>
        <AppMap items={this.state.items} />
      </div>
    );
  }
}

export default Home;
