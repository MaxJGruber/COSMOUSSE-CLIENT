import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Button, Confirm } from "semantic-ui-react";
import "../styles/LogElement.css";

function formatDate(date) {
  return date.toString().substring(0, 15);
}

class LogElement extends React.Component {
  state = {
    open: false,
  };

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });
  render() {
    console.log("_________", this.props);
    return (
      <div>
        <div className="LogElement">
          <div className="beer-info">
            <h3>{this.props.properties.name}</h3>
            <p>Type: {this.props.properties.type.toUpperCase()}</p>
            <p>Location: {this.props.properties.location.formattedAddress}</p>
            <p>
              Added: {formatDate(new Date(this.props.properties.createdAt))}
            </p>
          </div>
          <div className="options">
            <Link to={`/item/${this.props.id}/editpage`} id={this.props.id}>
              <button id="edit">
                <FontAwesomeIcon icon={faEdit} />
              </button>
            </Link>
            <Button
              type="button"
              id="delete"
              className="button"
              onClick={this.open}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
            <Confirm
              open={this.state.open}
              onCancel={this.close}
              onConfirm={() => this.props.deleteItem(this.props.id)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default LogElement;
