/** @format */

import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import VideocamIcon from "@material-ui/icons/Videocam";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import styled from "styled-components";
import { useAuth } from "../Reducer";
const Messenger = () => {
  const [username, setUsername] = useState("");
  const [text, setText] = useState("");
  const [photo, setPhoto] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const { state, dispatch } = useAuth();
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
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("text", text);
    formData.append("photo", photo);

    fetch("http://localhost:5001/user/upload", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"), // the token is attached here
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("Story successfully inserted!");
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("Error inserting story");
      });
    window.location.reload();
  };

  return (
    <MessengerWrapper>
      <MessengerTop>
        <Avatar
          src=" https://pbs.twimg.com/profile_images/
1020939891457241088/fcbu814K_400x400.jpg "
        />
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <input type="hidden" id="username" name="username" value={username} />
          <input
            type="text"
            id="text"
            placeholder="What's on your mind?"
            className="messenger__input"
            required
            name="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {state.isLoggedIn && (
            <input
              type="file"
              className="messenger__fileSelector"
              id="photo"
              required
              name="photo"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          )}
          {state.isLoggedIn ? (
            <button type="submit">Post poi</button>
          ) : (
            <p>Please, login to upload photos.</p>
          )}
        </form>
      </MessengerTop>
      <MessengerBottom>
        <div className="messenger__option">
          <VideocamIcon style={{ color: "red" }} />
          <h3>Live Video</h3>
        </div>
        <div className="messenger__option">
          <PhotoLibraryIcon style={{ color: "green" }} />
          <h3>Photo/Video</h3>
        </div>
        <div className="messenger__option">
          <InsertEmoticonIcon style={{ color: "orange" }} />
          <h3>Feeling/Activity</h3>
        </div>
      </MessengerBottom>
    </MessengerWrapper>
  );
};
const MessengerWrapper = styled.div`
  display: flex;
  margin-top: 30px;
  flex-direction: column;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0px 5px 7px -7px rgba(0, 0, 0, 0.75);
  width: 100%;
`;
const MessengerTop = styled.div`
  display: flex;
  border-bottom: 1px solid #eff2f5;
  padding: 15px;
  form {
    flex: 1;
    display: flex;
    .messenger__input {
      flex: 1;
      outline-width: 0;
      border: none;
      padding: 5px 20px;
      margin: 0 10px;
      border-radius: 999px;
      background-color: #eff2f5;
    }
    .messenger__fileSelector {
      width: 20%;
    }
    button {
      background-color: #0077ff;
      border: none;
      border-radius: 33px;
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      margin-left: 10px;
      padding: 10px 20px;
      cursor: pointer;
      z-index: 1;
      box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
      transition: all 0.3s ease;
    }

    button:hover {
      background-color: #0066cc;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
    }
  }
`;
const MessengerBottom = styled.div`
  display: flex;
  justify-content: space-evenly;
  .messenger__option {
    padding: 20px;
    display: flex;
    align-items: center;
    color: gray;
    margin: 5px;
    h3 {
      font-size: medium;
      margin-left: 10px;
    }
    &:hover {
      background-color: #eff2f5;
      border-radius: 20px;
      cursor: pointer;
    }
  }
`;
export default Messenger;
