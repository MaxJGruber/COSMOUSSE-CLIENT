import React from "react";
import { NavLink } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";

import "../styles/NavMain.css";

const NavMain = (props) => {
  const { context } = props;

  return (
    <nav className="NavMain">
      <NavLink exact to="/about">
        <h3 className="logo">About</h3>
      </NavLink>
      {context.isLoggedIn && (
        <React.Fragment>
          <NavLink to="/profile">
            <img
              className="profileImage"
              src={context.user.profileImage}
              alt="you"
            />
          </NavLink>
        </React.Fragment>
      )}
      {!context.isLoggedIn && (
        <React.Fragment>
          <NavLink to="/signup">
            <FontAwesomeIcon icon={faSignInAlt} />
          </NavLink>
        </React.Fragment>
      )}
      <NavLink to="/loglist">
        <FontAwesomeIcon icon={faClipboardList} />
      </NavLink>
    </nav>
  );
};

export default withUser(NavMain);
