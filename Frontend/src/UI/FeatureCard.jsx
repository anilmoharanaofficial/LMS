import styled, { css } from "styled-components";
import Heading from "../UI/Heading";
import Button from "./Button";
import { NavLink } from "react-router-dom";

const position = {
  reverse: css`
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    flex-direction: row-reverse;
  `,
};

const StyledFeatueCard = styled.div`
  margin-top: 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;

  ${(props) => props.$position && position[props.$position]}
`;

const ImgContainer = styled.div`
  width: 50%;
`;

const Img = styled.img`
  height: 500px;
  width: auto;
`;

const Details = styled.div`
  width: 50%;
`;

const P = styled.p`
  font-family: "Nunito", sans-serif;
  color: rgb(101, 126, 148);
  font-weight: 600;
  font-size: 18px;
  line-height: 27px;
  margin-bottom: 2.5rem;
`;

function FeatureCard({ positionType, image, heading, title, description }) {
  let src = image;

  return (
    <StyledFeatueCard $position={positionType}>
      <ImgContainer>
        <Img src={src} alt="Hero Image" loading="lazy" />
      </ImgContainer>
      <Details>
        <Heading type="h4">{heading}</Heading>
        <Heading type="h1">{title}</Heading>
        <P>{description}</P>
        <Button $size="hero" as={NavLink} to="/learn">
          Start Learning
        </Button>
      </Details>
    </StyledFeatueCard>
  );
}

export default FeatureCard;
