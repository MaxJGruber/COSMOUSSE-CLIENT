import React from "react";
import FormSignin from "../components/Forms/FormSignin";
import NavMain from "../components/NavMain";
import "../styles/global.css";

const Signin = (props) => {
  return (
    <div className="upperScreen">
      <FormSignin />
      <NavMain page="signin" />
    </div>
  );
};

export default Signin;
