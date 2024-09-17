import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.type === "h1" &&
    css`
      font-family: "Nunito", sans-serif;
      font-size: 4rem;
      font-weight: 800;
      color: black;
    `}

  ${(props) =>
    props.type === "h2" &&
    css`
      font-family: "Nunito", sans-serif;
      font-size: 2rem;
      font-weight: 600;
    `}

    ${(props) =>
    props.type === "h3" &&
    css`
      font-family: "Nunito", sans-serif;
      font-size: 2rem;
      font-weight: 500;

      @media screen and (max-width: 768px) {
        font-size: 1.4rem;
        font-weight: 600;
      }
    `}

    ${(props) =>
    props.type === "h4" &&
    css`
      font-family: "Nunito", sans-serif;
      font-size: 28px;
      font-weight: 700;
      line-height: 42px;
      margin-bottom: 1rem;
    `}

    ${(props) =>
    props.type === "form" &&
    css`
      margin-top: 2rem;
      font-size: 2rem;
      font-weight: 500;
    `}

    ${(props) =>
    props.type === "extraSmall" &&
    css`
      font-size: 1.7rem;
      font-weight: 500;
      color: var(color-grey-100);
    `}

    ${(props) =>
    props.type === "normal" &&
    css`
      font-size: 1.7rem;
      font-weight: 500;
      color: var(color-grey-100);
    `}


  line-height: 1.4
`;

export default Heading;
