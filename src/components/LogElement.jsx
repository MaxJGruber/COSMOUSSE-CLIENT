import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import "../styles/LogElement.css";

const LogElement = (props) => {
  // console.log(props);
  return (
    <div>
      <div className="LogElement">
        <h3>{props.name}</h3>

        <button id="edit">
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button id="delete">
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>
    </div>
  );
};

export default LogElement;
