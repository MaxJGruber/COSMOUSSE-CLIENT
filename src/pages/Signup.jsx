import React from "react";
import FormSignup from "../components/Forms/FormSignup";
import NavMain from "../components/NavMain";
import "../styles/global.css";

const Signup = (props) => {
  return (
    <div className="upperScreen">
      <FormSignup /> <NavMain page="signin" />
    </div>
  );
};

export default Signup;
