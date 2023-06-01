/** @format */

import React from "react";
import { Avatar } from "@material-ui/core";
import styled from "styled-components";
const SidebarRow = ({ src, Icon, title, onClick }) => {
  return (
    <SidebarRowWrapper onClick={onClick}>
      {src && <Avatar src={src} />}
      {Icon && <Icon />}
      <p>{title}</p>
    </SidebarRowWrapper>
  );
};
const SidebarRowWrapper = styled.div`
  position: static;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: lightgray;
    border-radius: 10px;
  }
  p {
    margin-left: 20px;
    font-weight: 600;
  }
  .MuiSvgIcon-root {
    font-size: xx-large;
    color: #2e81f4;
  }
`;
export default SidebarRow;
