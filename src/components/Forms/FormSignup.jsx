import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { UserContext } from "../Auth/UserContext";
import apiHandler from "../../api/apiHandler";
import { Link } from "react-router-dom";
import { Label } from "semantic-ui-react";
import "../../styles/Form.css";

const validateSchema = ({ errors, ...rest }) => {
  const err = {};
  for (let key in rest) {
    // console.log(rest[key]);
    if (rest[key] === "") {
      err[key] = true;
    } else if (getAge(rest[key]) < 18) {
      err[key] = true;
    }
  }
  return err;
};

const getAge = (birthDate) =>
  Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e10);

class FormSignup extends Component {
  static contextType = UserContext;

  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    birthday: "",
    errors: {},
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

    const errors = validateSchema(this.state);
    if (Object.keys(errors).length) {
      this.setState({ errors: errors });
      return;
    }

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
            {this.state.errors.firstName && (
              <Label basic color="red" pointing>
                Please enter your first name
              </Label>
            )}
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              onChange={this.handleChange}
            />
            {this.state.errors.lastName && (
              <Label basic color="red" pointing>
                Please enter your last name
              </Label>
            )}
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={this.handleChange}
            />
            {this.state.errors.email && (
              <Label basic color="red" pointing>
                Please enter an email address
              </Label>
            )}
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={this.handleChange}
            />
            {this.state.errors.password && (
              <Label basic color="red" pointing>
                Please enter a password
              </Label>
            )}
            <label htmlFor="birthday">Birthday</label>
            <input
              type="date"
              id="birthday"
              name="birthday"
              onChange={this.handleChange}
            />
            {this.state.errors.birthday && (
              <Label basic color="red" pointing>
                You must be 18 or over to create an account
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
