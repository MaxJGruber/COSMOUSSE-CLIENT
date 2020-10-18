import React from "react";
import LogElement from "../components/LogElement";
import API from "../api/apiHandler";
import NavMain from "../components/NavMain";

class Loglist extends React.Component {
  state = {
    items: [],
    itemToDelete: null,
  };

  componentDidMount = () => {
    API.getItems("/items")
      .then((dbRes) => {
        console.log(dbRes);
        this.setState({ items: dbRes });
      })
      .catch((error) => console.log(error));
  };

  // deleteItem = () => {

  // }

  render() {
    return (
      <div>
        {this.state.items.map((item, i) => {
          console.log(item.name);
          return <LogElement name={item.name} />;
        })}
        <NavMain page="loglist" />
      </div>
    );
  }
}

export default Loglist;
