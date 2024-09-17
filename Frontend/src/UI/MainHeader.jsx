import styled from "styled-components";
import Logo from "./Logo";
import Button from "./Button";

const StyledMainHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
`;

function MainHeader() {
  return (
    <StyledMainHeader>
      <Logo />
      <Button>Login / Register</Button>
    </StyledMainHeader>
  );
}

export default MainHeader;
