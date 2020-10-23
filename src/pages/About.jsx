import React from "react";
import { withUser } from "../components/Auth/withUser.jsx";
import NavMain from "../components/NavMain";
import { Link } from "react-router-dom";
import "../styles/About.css";
import "../styles/global.css";

const About = (props) => {
  const { context } = props;
  // console.log(context);

  return (
    <div className="upperScreen">
      <div className="About">
        <div className="introduction">
          <h1>Hey User!</h1>
          {/* {context.user.firstName && <h1>Hey {context.user.firstName}!</h1>} */}
          <h3>Welcome to CosMousse!</h3>
          <p>Where every beer-lover can keep track of their fun times!</p>
        </div>
        <div className="values-container">
          <h4 className="title">Record!</h4>
          <p className="value-description">
            Pin the Map with every beer you enjoy.
          </p>
          <h4 className="title">Remember!</h4>
          <p className="value-description">
            Keep track of past times by checking a beer you might have had
            somewhere and check if it's worth having it again.
          </p>
          <h4 className="title">Update!</h4>
          <p className="value-description">
            Update your logs if your tastes change or if your favourite pint is
            no longer available.
          </p>
        </div>
        <div className="hook">
          <Link to="/signup">
            <h4 className="question-link">
              Ready to start your CosMousse adventure?
            </h4>
          </Link>
        </div>
      </div>
      <NavMain page="about" />
    </div>
  );
};

export default withUser(About);
