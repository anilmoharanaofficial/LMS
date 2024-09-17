import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: #222;
  color: #fff;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
    padding: 3rem 5rem;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;

  img {
    max-width: 150px;
    margin-right: 1rem;
  }

  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`;

const SocialIcons = styled.div`
  margin: 1rem 0;

  a {
    color: #fff;
    font-size: 2rem;
    margin: 0 1rem;
    text-decoration: none;

    &:hover {
      color: #76c7c0;
    }
  }
`;

const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    text-align: center;

    @media (min-width: 768px) {
      text-align: left;
    }

    li {
      margin: 0.5rem 0;
    }

    a {
      color: #fff;
      text-decoration: none;
      font-size: 1.4rem;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const DownloadAppContainer = styled.div`
  margin-top: 2rem;

  img {
    max-width: 150px;
  }

  @media (min-width: 768px) {
    margin-top: 0;
  }
`;

const CopyrightText = styled.div`
  margin-top: 2rem;
  font-size: 1.2rem;

  @media (min-width: 768px) {
    margin-top: 0;
  }
`;

const MainFooter = () => {
  return (
    <FooterContainer>
      <Logo>
        <img src="your-logo.png" alt="Yoga LMS Logo" />
        <div>YOGA LMS</div>
      </Logo>

      <LinksContainer>
        <ul>
          <li>
            <a href="#">Yoga LMS App</a>
          </li>
          <li>
            <a href="#">About Us</a>
          </li>
          <li>
            <a href="#">Contact Us</a>
          </li>
          <li>
            <a href="#">Terms & Conditions</a>
          </li>
          <li>
            <a href="#">Privacy Policy</a>
          </li>
        </ul>

        <SocialIcons>
          <a href="#">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="#">
            <i className="fab fa-instagram"></i>
          </a>
        </SocialIcons>
      </LinksContainer>

      <DownloadAppContainer>
        <a href="#">
          <img src="google-play-button.png" alt="Download from Google Play" />
        </a>
      </DownloadAppContainer>

      <CopyrightText>© Copyright Yoga LMS. All Rights Reserved.</CopyrightText>
    </FooterContainer>
  );
};

export default MainFooter;
