import React from "react";
import { withRouter } from "react-router-dom";
import {
  ColletionPreviewContainer,
  TitleContainer,
  PreviewContainer,
} from "./collection-preview.styles";

import CollectionItem from "../collection-item/collection-item.component";
const CollectionPreview = ({ title, items, routeName, history, match }) => (
  <ColletionPreviewContainer>
    <TitleContainer onClick={() => history.push(`${match.url}/${routeName}`)}>
      {title}
    </TitleContainer>
    <PreviewContainer>
      {items
        .filter((item, idx) => idx < 4)
        .map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
    </PreviewContainer>
  </ColletionPreviewContainer>
);

export default withRouter(CollectionPreview);
