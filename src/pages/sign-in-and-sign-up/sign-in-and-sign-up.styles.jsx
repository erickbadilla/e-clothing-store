import styled from "styled-components";

export const SignInAndSignUpContainer = styled.div`
  width: 60vw;
  display: flex;
  justify-content: space-between;
  margin: 30px auto;


  @media screen and (max-width: 1040px) {
    flex-direction: column;
    align-items: center;
    width: 80vw;

    div{
      margin: 15px;
    }
  }


`;
