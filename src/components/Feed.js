/** @format */

import React, { useEffect, useState } from "react";
import Stories from "./Stories";
import styled from "styled-components";
import Messenger from "./Messenger";
import Post from "./Post";
const Feed = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/user/getphotos")
      .then((response) => response.json())
      .then((data) => setImages(data))
      .catch((error) => console.error(error));
  }, []);
  return (
    <FeedWrapper>
      <Stories />
      <Messenger />
      {images.map((image) => (
        <Post
          key={image.id}
          profilePic={image.data}
          message={image.text}
          image={image.data}
          timestamp={image.date}
          username={image.username}
        />
      ))}
    </FeedWrapper>
  );
};
const FeedWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export default Feed;
