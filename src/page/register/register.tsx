import React from "react";
import { Link } from "react-router-dom";
import FormLayout from "share/form-layout/form-layout";

const Register: React.FC = () => {
  return (
    <FormLayout>
      <Link to="/login" className="nav-link">
        Go to Login
      </Link>
    </FormLayout>
  );
};

export default Register;
