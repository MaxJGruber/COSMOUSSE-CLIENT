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

  deleteItem = (id) => {
    console.log(id);
    API.deleteOne(`/item/${id}/delete`)
      .then(this.componentDidMount)
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <div>
        {this.state.items.map((item, i) => {
          console.log(item.name);
          return (
            <LogElement
              key={i}
              name={item.name}
              id={item._id}
              deleteItem={this.deleteItem}
            />
          );
        })}
        <NavMain page="loglist" />
      </div>
    );
  }
}

export default Loglist;
