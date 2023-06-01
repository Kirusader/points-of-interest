/** @format */

import React, { useEffect, useState } from "react";
import SidebarRow from "./SidebarRow";
import FeedIcon from "@mui/icons-material/Feed";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import styled from "styled-components";
import { useAuth } from "../Reducer";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { state, dispatch } = useAuth();
  const navigate = useNavigate();
  const [logout, setLogout] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
      dispatch({
        type: "LOGIN",
        payload: { username: storedUsername, isLoggedIn: true },
      });
    }
  }, [dispatch]);

  useEffect(() => {
    if (logout) {
      dispatch({ type: "LOGOUT" });
      localStorage.removeItem("username");
      navigate("/login");
      setLogout(false); // reset the state after logout
    }
  }, [logout, dispatch, navigate]);

  const handleCovid = () => {
    navigate("/poi");
  };
  const handleContactUs = () => {
    navigate("/contact");
  };
  const handleAboutUs = () => {
    navigate("/about");
  };
  const handleLogin = () => {
    navigate("/login");
  };
  const handleLogout = () => {
    setLogout(true);
  };
  const handlePost = () => {
    navigate("/");
  };

  return (
    <SidebarWrapper>
      <SidebarRow
        src="https://pbs.twimg.com/profile_images/
1020939891457241088/fcbu814K_400x400.jpg"
        title={<p>Welcome, {username}</p>}
      />
      <SidebarRow
        onClick={handleCovid}
        Icon={FeedIcon}
        title="Point Of Interest"
      />
      <SidebarRow
        onClick={handlePost}
        Icon={AddAPhotoIcon}
        title="Post Photos"
      />
      <SidebarRow
        onClick={handleContactUs}
        Icon={ContactMailIcon}
        title="Contact Us"
      />
      <SidebarRow
        onClick={handleAboutUs}
        Icon={LiveHelpIcon}
        title="About Us"
      />
      {state.isLoggedIn ? (
        <SidebarRow onClick={handleLogout} Icon={LogoutIcon} title="Logout" />
      ) : (
        <SidebarRow onClick={handleLogin} Icon={LoginIcon} title="Login" />
      )}
    </SidebarWrapper>
  );
};

const SidebarWrapper = styled.div`
  position: static;
  top: 0;
  left: 0;
`;

export default Sidebar;
