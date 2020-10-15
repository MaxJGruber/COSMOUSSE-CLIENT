import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const LogElement = () => {
  return (
    <div>
      <div className="LogElement">
        <h3>Beer Name</h3>
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
