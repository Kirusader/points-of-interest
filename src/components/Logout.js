/** @format */

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Reducer";

const Logout = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuth();

  useEffect(() => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  }, []);

  return <div>Logging out...</div>;
};

export default Logout;
