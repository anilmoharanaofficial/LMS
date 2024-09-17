import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: left;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Img = styled.img`
  height: 5.6rem;
  width: auto;
`;

function Logo() {
  return (
    <StyledLogo>
      <Img src="/logo/header-logo.png" alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
