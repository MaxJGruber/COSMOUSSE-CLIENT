import React from "react";
import LogElement from "../components/LogElement";
import API from "../api/apiHandler";
import NavMain from "../components/NavMain";
import "../styles/LogElement.css";
import "../styles/global.css";

class Loglist extends React.Component {
  state = {
    items: [],
    itemToDelete: null,
  };

  componentDidMount = () => {
    API.getItems("/items")
      .then((dbRes) => {
        this.setState({ items: dbRes });
      })
      .catch((error) => console.log(error));
  };

  deleteItem = (id) => {
    console.log(id);
    API.deleteOne(`/item/${id}/delete`)
      .then(this.componentDidMount)
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <>
        <div className="upperScreen LogList">
          {this.state.items.map((item, i) => {
            return (
              <LogElement
                key={i}
                properties={{ ...item }}
                id={item._id}
                deleteItem={this.deleteItem}
              />
            );
          })}
          {!this.state.items.length && <h1>You have no items in your list</h1>}
        </div>
        <NavMain page="loglist" />
      </>
    );
  }
}

export default Loglist;
