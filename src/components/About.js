/** @format */
import React from "react";
import styled from "styled-components";
import manavator from "./photo/manavator.png";
import customer from "./photo/customer.png";
import finance from "./photo/finance.png";
const PageWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
`;

const Text = styled.p`
  text-align: justify;
  line-height: 1.6;
`;

const TeamWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 20px;
`;

const TeamMember = styled.div`
  flex: 0 0 200px;
  margin: 10px;
  text-align: center;
`;

const TeamPhoto = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const About = () => {
  return (
    <PageWrapper>
      <Title>About Us</Title>
      <Text>
        We are a passionate team committed to bringing you the most interesting
        places from all around the globe. Our mission is to inspire, inform, and
        equip travellers to have experiences that truly matter. Whether you're
        planning a short getaway or a long journey, we have got you covered with
        all the information you need to explore the world's most exciting
        places.
      </Text>

      <Title>Our Team</Title>
      <TeamWrapper>
        <TeamMember>
          <TeamPhoto src={manavator} alt="team member 1" />
          <h3>Kiros Hadera</h3>
          <p>General Manager</p>
        </TeamMember>

        <TeamMember>
          <TeamPhoto src={customer} alt="team member 2" />
          <h3>Judy Oliver</h3>
          <p>Customer Service Officer</p>
        </TeamMember>

        <TeamMember>
          <TeamPhoto src={finance} alt="team member 3" />
          <h3>Steven Joe</h3>
          <p>Finance Team Leader</p>
        </TeamMember>
      </TeamWrapper>
    </PageWrapper>
  );
};

export default About;
