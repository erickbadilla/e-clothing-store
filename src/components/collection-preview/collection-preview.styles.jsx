import styled from "styled-components";
import { Link } from "react-router-dom";

export const ColletionPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

export const TitleContainer = styled(Link)`
  font-size: 28px;
  margin-bottom: 25px;
  font-weight: bold;
`;

export const PreviewContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
