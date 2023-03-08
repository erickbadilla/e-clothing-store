import React, { lazy } from "react";
import { HomePageContainer } from "./homepage.styles";
const Directory = lazy(() =>
  import("../../components/directory/directory.component")
);

const HomePage = () => (
  <HomePageContainer>
    <Directory />
  </HomePageContainer>
);

export default HomePage;
