import React from "react";
import { Link } from "react-router-dom";
import FormLayout from "share/form-layout";

const Login: React.FC = () => {
  return (
    <FormLayout>
      <Link to="/register" className="nav-link">
        Go to Register
      </Link>
    </FormLayout>
  );
};

export default Login;
