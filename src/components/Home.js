/** @format */

import React from "react";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widget from "./Widget";
const Home = () => {
  return (
    <div style={{ display: "flex", padding: "20px" }}>
      <div style={{ position: "sticky", left: "0" }}>
        <Sidebar />
      </div>
      <Feed />
      <Widget />
    </div>
  );
};

export default Home;
