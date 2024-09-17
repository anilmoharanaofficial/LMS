import styled, { css } from "styled-components";
import Button from "../UI/Button";
import YogaStats from "./YogaStats";
import { NavLink } from "react-router-dom";

const StyledHero = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  margin-top: 1rem;
`;

const ImgContainer = styled.div`
  width: 50%;
`;

const Img = styled.img`
  height: 700px;
  width: auto;
`;

const Slogan = styled.div`
  width: 50%;
`;

const Highlight = {
  blue: css`
    color: blue;
  `,
};

const Text = styled.span`
  font-family: "Nunito", sans-serif;
  color: black;
  font-size: 62px;
  font-weight: 800;
  line-height: 79px;

  ${(props) => props.$Highlight && Highlight[props.$Highlight]}
`;

const P = styled.p`
  font-family: "Nunito", sans-serif;
  color: rgb(101, 126, 148);
  font-weight: 600;
  font-size: 24px;
  line-height: 27px;
  margin-bottom: 2.5rem;
`;

function Hero() {
  return (
    <>
      <StyledHero>
        <Slogan>
          <Text>EXPERIENCE THE&nbsp;</Text>
          <Text $Highlight="blue">INNER PEACE</Text>
          <P>Online Yoga for All Levels</P>
          <Button $size="hero" as={NavLink} to="/learn">
            Start Learning
          </Button>
        </Slogan>
        <ImgContainer>
          <Img src="/assets/Hero-Yoga.svg" alt="Hero Image" />
        </ImgContainer>
      </StyledHero>
      <YogaStats />
    </>
  );
}

export default Hero;
