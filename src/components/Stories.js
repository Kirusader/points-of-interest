/** @format */

import React, { useEffect, useState } from "react";
import Story from "./Story";
import styled from "styled-components";
const Stories = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/user/getphotos")
      .then((response) => response.json())
      .then((data) => setImages(data))
      .catch((error) => console.error(error));
  }, []);
  return (
    <StoriesWrapper>
      {images.slice(0, 4).map((image) => (
        <Story
          key={image.id}
          profileSrc={image.data}
          title={image.username}
          image={image.data}
        />
      ))}
    </StoriesWrapper>
  );
};
const StoriesWrapper = styled.div`
  display: flex;
`;
export default Stories;
