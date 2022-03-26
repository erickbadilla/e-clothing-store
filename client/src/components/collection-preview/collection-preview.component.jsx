import React from "react";
import {withRouter} from "react-router-dom";
import {CollectionPreviewContainer, PreviewContainer, TitleContainer,} from "./collection-preview.styles";

import CollectionItem from "../collection-item/collection-item.component";

const CollectionPreview = ({title, items, routeName, history, match}) => (
    <CollectionPreviewContainer>
        <TitleContainer onClick={() => history.push(`${match.url}/${routeName}`)}>
            {title}
        </TitleContainer>
        <PreviewContainer>
            {items
                .filter((item, idx) => idx < 4)
                .map((item) => (
                    <CollectionItem key={item.id} item={item}/>
                ))}
        </PreviewContainer>
    </CollectionPreviewContainer>
);

export default withRouter(React.memo(CollectionPreview));
