import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { UserContext } from "../Auth/UserContext";
import apiHandler from "../../api/apiHandler";
import { Link } from "react-router-dom";
import { Label } from "semantic-ui-react";
import "../../styles/Form.css";

class FormSignup extends Component {
  static contextType = UserContext;

  state = {
    email: "",
    password: "",
  };

  handleChange = (event) => {
    const value =
      event.target.type === "file"
        ? event.target.files[0]
        : event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    const key = event.target.name;
    // console.log(key, value);

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData();

    for (let key in this.state) {
      fd.append(key, this.state[key]);
    }

    apiHandler
      .signup(fd)
      .then((data) => {
        this.context.setUser(data);
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="background-form">
        <div className="form-container">
          <form className="Form" onSubmit={this.handleSubmit}>
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
            {!this.state.firstName && (
              <Label basic color="red" pointing>
                Please enter a value
              </Label>
            )}
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              onChange={this.handleChange}
            />
            {!this.state.lastName && (
              <Label basic color="red" pointing>
                Please enter a value
              </Label>
            )}
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={this.handleChange}
            />
            {!this.state.email && (
              <Label basic color="red" pointing>
                Please enter a value
              </Label>
            )}
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={this.handleChange}
            />
            {!this.state.password && (
              <Label basic color="red" pointing>
                Please enter a value
              </Label>
            )}
            <label htmlFor="birthday">Birthday</label>
            <input
              type="date"
              id="birthday"
              name="birthday"
              onChange={this.handleChange}
            />
            {!this.state.birthday && (
              <Label basic color="red" pointing>
                Please enter a value
              </Label>
            )}
            {this.state.birthday < 18 && (
              <Label basic color="red" pointing>
                You must be over 18 to create an account
              </Label>
            )}
            <button>Create Account</button>
            <p className="question">
              Already have an account ?{" "}
              <Link className="link" to="/signin">
                Signin
              </Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(FormSignup);
