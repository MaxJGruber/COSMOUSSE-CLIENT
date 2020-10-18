import React from "react";
import FormSignup from "../components/Forms/FormSignup";
import NavMain from "../components/NavMain";

const Signup = (props) => {
  return (
    <div>
      <FormSignup /> <NavMain page="signin" />
    </div>
  );
};

export default Signup;
