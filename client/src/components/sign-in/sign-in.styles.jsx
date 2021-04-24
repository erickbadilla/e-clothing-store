import styled from "styled-components";

export const SignInContainer = styled.div`
  width: 25vw;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 1040px) {
    width: 300px;
  }
`;

export const TitleContainer = styled.h2`
  margin: 10px 0;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    margin: 5px;
  }

  @media screen and (max-width: 1730px) {
    flex-wrap: wrap;
    justify-content: center;
    button {
      width: 250px;
    }
  }
`;
