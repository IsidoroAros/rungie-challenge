import React from "react";
import styled from "styled-components";
import Grid from "./Components/Grid/Grid";
import "./Main.scss";

function App() {
  return (
    <main className="app">
      <AppContainer>
        <AppBanner>
          <img src="../public/img/rungie_logo.svg" alt="rungie-logo" />
        </AppBanner>
        <Grid gridRows={5} gridColumns={5} />
      </AppContainer>
    </main>
  );
}

const AppContainer = styled.section`
  width: 100%;
  height: 100%;
  padding: 20px;
`;

const AppBanner = styled.span`
  width: 100%;
  display: flex;
  justify-content: center;

  > img {
    width: 100%;
    max-width: 200px;
    margin: 0 auto 20px auto;
  }
`;

export default App;
