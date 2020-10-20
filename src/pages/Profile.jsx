import React from "react";
import { Link } from "react-router-dom";
import API from "../api/apiHandler";
import NavMain from "../components/NavMain";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../components/Auth/UserContext";
class Profile extends React.Component {
  static contextType = UserContext;

  state = {
    firstName: "",
    lastName: "",
    profileImage: "",
  };

  componentDidMount() {
    this.setState({
      firstName: this.context.user.firstName,
      lastName: this.context.user.lastName,
      profileImage: this.context.user.profileImage,
    });
  }

  handlePlace = (place) => {
    const location = place.geometry;
    location.formattedAddress = place.place_name;
    this.setState({ location });
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
    API.updateUser("/user/edit", fd)
      .then((dbRes) => {
        console.log(dbRes);
        this.props.history.push("/");
      })
      .catch((error) => console.log(error));
  };

  deleteAccount = (event) => {
    event.preventDefault();
    API.deleteUser("/user/delete")
      .then((dbRes) => this.context.removeUser())
      .catch((error) => console.log(error));
  };

  render() {
    console.log(this.context);
    return (
      <div className="background-form edit">
        <div className="form-container">
          <form className="Form">
            <img
              src={this.state.profileImage}
              alt="profile-pic"
              className="profile-photo"
            />
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
              defaultValue={this.state.firstName}
              onChange={this.handleChange}
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              defaultValue={this.state.lastName}
              onChange={this.handleChange}
            />
            <Link to="/loglist" id="logs">
              <button>Check Logs</button>
            </Link>
            <br />
            <div className="option-btns">
              <button id="delete" onClick={this.deleteAccount}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>{" "}
              <button id="save" onClick={this.handleEdit}>
                Save Changes
              </button>{" "}
              <button id="logout" onClick={this.sessionLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} />
              </button>
            </div>
          </form>
        </div>
        <NavMain page="edit-profile" />
      </div>
    );
  }
}

export default withRouter(Profile);
