import React from "react";
import FormSignin from "../components/Forms/FormSignin";
import NavMain from "../components/NavMain";

const Signin = (props) => {
  return <div>
    <FormSignin />
    <NavMain page="signin"/>
    </div>
};

export default Signin;
