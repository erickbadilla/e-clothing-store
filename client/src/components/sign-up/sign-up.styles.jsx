import styled from "styled-components";

export const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 25vw;

  @media screen and (max-width: 1040px) {
    width: 300px;
  }
`;

export const TitleContainer = styled.h2`
  margin: 10px 0;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;
