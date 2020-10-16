import React from "react";
import LogElement from "../components/LogElement";
import API from "../api/apiHandler";

class Loglist extends React.Component {
  state = {
    items: [],
  };

  componentDidMount = () => {
    API.getItems("/items")
      .then((dbRes) => {
        console.log(dbRes);
        this.setState({ items: dbRes });
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <div>
        <h1>Loglist</h1>
        {this.state.items.map((item, i) => {
          console.log(item.name);
          return <LogElement name={item.name} />;
        })}
      </div>
    );
  }
}

export default Loglist;
