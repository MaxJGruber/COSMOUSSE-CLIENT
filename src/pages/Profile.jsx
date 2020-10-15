import React from "react";
import { Link } from "react-router-dom";
import API from "../api/apiHandler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../components/Auth/UserContext";
class Profile extends React.Component {
  static contextType = UserContext;

  state = {
    firstName: "",
    lastName: "",
  };

  sessionLogout = () => {
    API.logout("/api/auth/logout")
      .then((dbRes) => this.context.removeUser())
      .catch((error) => console.log(error));
  };

  handleChange = (event) => {
    const value =
      event.target.type === "file"
        ? event.target.files[0]
        : event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    const key = event.target.name;
    console.log(key, value);

    this.setState({ [key]: value });
  };

  handleEdit = (event) => {
    event.preventDefault();
    const fd = new FormData();

    for (let key in this.state) {
      fd.append(key, this.state[key]);
    }
    API.updateUser(fd)
      .then((dbRes) => console.log(dbRes))
      .catch((error) => console.log(error));
  };

  deleteAccount = (event) => {
    event.preventDefault();
    API.deleteUser("/user/delete")
      .then((dbRes) => this.context.removeUser())
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <div className="signup-page">
        <div className="signup-form-container">
          <form className="Form">
            <label htmlFor="profileImage">Profile Image</label>
            <input
              type="file"
              id="profileImage"
              name="profileImage"
              onChange={this.handleChange}
            />
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              onChange={this.handleChange}
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              onChange={this.handleChange}
            />
            <Link to="/loglist" id="logs">
              Check Logs
            </Link>
            <div className="option-btns">
              <button id="delete" onClick={this.deleteAccount}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
              <button id="save" onClick={this.handleEdit}>
                Save Changes
              </button>

              <button id="logout" onClick={this.sessionLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} />
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Profile;
