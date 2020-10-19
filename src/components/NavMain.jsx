import React from "react";
import { NavLink } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";

import "../styles/NavMain.css";

const NavMain = (props) => {
  const { context } = props;
  // console.log(props.page);
  switch (props.page) {
    case "loglist":
      return (
        <nav className="NavMain">
          <NavLink exact to="/about">
            <h3 className="logo">About</h3>
          </NavLink>
          <NavLink to="/">
            <FontAwesomeIcon icon={faHome} />
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
              <NavLink to="/signin">
                <FontAwesomeIcon icon={faSignInAlt} />
              </NavLink>
            </React.Fragment>
          )}
        </nav>
      );
    case "edit-profile":
      return (
        <nav className="NavMain">
          <NavLink exact to="/about">
            <h3 className="logo">About</h3>
          </NavLink>
          <NavLink to="/">
            <FontAwesomeIcon icon={faHome} />
          </NavLink>

          <NavLink to="/loglist">
            <FontAwesomeIcon icon={faClipboardList} />
          </NavLink>
        </nav>
      );
    case "signin":
      return (
        <nav className="NavMain">
          <NavLink exact to="/about">
            <h3 className="logo">About</h3>
          </NavLink>
          <NavLink to="/">
            <FontAwesomeIcon icon={faHome} />
          </NavLink>

          <NavLink to="/loglist">
            <FontAwesomeIcon icon={faClipboardList} />
          </NavLink>
        </nav>
      );
    case "signup":
      return (
        <nav className="NavMain">
          <NavLink exact to="/about">
            <h3 className="logo">About</h3>
          </NavLink>
          <NavLink to="/">
            <FontAwesomeIcon icon={faHome} />
          </NavLink>

          <NavLink to="/loglist">
            <FontAwesomeIcon icon={faClipboardList} />
          </NavLink>
        </nav>
      );
    default:
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
              <NavLink to="/signin">
                <FontAwesomeIcon icon={faSignInAlt} />
              </NavLink>
            </React.Fragment>
          )}
          <NavLink to="/loglist">
            <FontAwesomeIcon icon={faClipboardList} />
          </NavLink>
        </nav>
      );
  }
};

export default withUser(NavMain);
