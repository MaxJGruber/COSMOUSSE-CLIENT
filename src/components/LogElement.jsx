import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import "../styles/LogElement.css";

const LogElement = (props) => {
  console.log("_________", props);
  return (
    <div>
      <div className="LogElement">
        <div className="beer-info">
          <h3>{props.properties.name}</h3>
        </div>
        <div className="options">
          <Link to={`/item/${props.id}/editpage`} id={props.id}>
            <button id="edit">
              <FontAwesomeIcon icon={faEdit} />
            </button>
          </Link>
          <button id="delete" onClick={() => props.deleteItem(props.id)}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogElement;
