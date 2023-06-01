/** @format */

import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
const FormWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
  text-align: center;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  margin-bottom: 10px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #008cba;
  color: white;
  border: none;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  &:hover {
    background-color: white;
    color: black;
  }
`;

const SocialMediaWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const SocialMediaLink = styled.a`
  margin: 0 10px;
`;

const ContactUs = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert(
      "Thanks for contacting us our qualified teams will reply soon to your request!!"
    );
    navigate("/");
  };

  return (
    <FormWrapper>
      <Title>Contact Us</Title>
      <form onSubmit={handleSubmit}>
        <Label>
          Name:
          <Input type="text" name="name" onChange={handleChange} />
        </Label>
        <Label>
          Email:
          <Input type="email" name="email" onChange={handleChange} />
        </Label>
        <Label>
          Message:
          <TextArea name="message" onChange={handleChange} />
        </Label>
        <SubmitButton type="submit">Submit</SubmitButton>
      </form>
      <SocialMediaWrapper>
        <SocialMediaLink href="https://facebook.com" target="_blank">
          <FacebookIcon />
        </SocialMediaLink>
        <SocialMediaLink href="https://twitter.com" target="_blank">
          <TwitterIcon />
        </SocialMediaLink>
        <SocialMediaLink href="https://instagram.com" target="_blank">
          <InstagramIcon />
        </SocialMediaLink>
      </SocialMediaWrapper>
    </FormWrapper>
  );
};

export default ContactUs;
