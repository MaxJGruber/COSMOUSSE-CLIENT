import React, { Component } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Auth/UserContext";
import { withRouter } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import { Label } from "semantic-ui-react";
import "../../styles/Form.css";

const validateSchema = ({ errors, ...rest }) => {
  const err = {};
  for (let key in rest) {
    // console.log(rest[key]);
    if (rest[key] === "") {
      err[key] = true;
    }
  }
  return err;
};

class FormSignin extends Component {
  static contextType = UserContext;

  state = {
    email: "",
    password: "",
    errors: {},
  };

  handleChange = (event) => {
    const key = event.target.name;

    // You can test more if you have to handle different sorts of inputs.
    const value =
      event.target.type === "file"
        ? event.target.files[0]
        : event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const errors = validateSchema(this.state);
    if (Object.keys(errors).length) {
      this.setState({ errors: errors });
      return;
    }

    apiHandler
      .signin(this.state)
      .then((data) => {
        this.context.setUser(data);
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
        // Display error message here, if you set the state
      });
  };

  render() {
    return (
      <div className="background-form signin">
        <div className="form-container">
          <form className="Form" onSubmit={this.handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={this.handleChange}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={this.handleChange}
            />
            {(this.state.errors.email || this.state.errors.password) && (
              <Label basic color="red">
                Your email or password is invalid
              </Label>
            )}
            <button>Sign In</button>
            <p className="question">
              Don't have an account?{" "}
              <Link className="link" to="/signup">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(FormSignin);
