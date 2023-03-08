import styled from "styled-components";

import { ReactComponent as SVGIcon } from "../../assets/shopping-bag.svg";

export const IconContainer = styled.div`
  width: 45px;
  height: 45px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  span {
    position: absolute;
    font-size: 10px;
    font-weight: bold;
    bottom: 12px;
  }
`;

export const ShoppingIcon = styled(SVGIcon)`
  width: 24px;
  height: 24px;
`;
