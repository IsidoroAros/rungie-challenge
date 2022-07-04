/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import styled from "styled-components";
import Grid from "./Components/Grid/Grid";
import "./Main.scss";

function App() {
  const [gridConfig, setGridConfig] = useState({
    rows: 5,
    columns: 5,
    isConfirmed: false,
  });

  return (
    <main className="app">
      <AppContainer>
        <AppBanner>
          <img src="../public/img/rungie_logo.svg" alt="rungie-logo" />
        </AppBanner>
        {gridConfig.isConfirmed ? (
          <Grid
            gridRows={gridConfig.rows || 5}
            gridColumns={gridConfig.columns || 5}
            setGridConfig={setGridConfig}
          />
        ) : (
          <GridConfigContainer>
            <h3>Configure your grid</h3>
            <div>
              <span>
                <label htmlFor="rows">Rows</label>
                <input
                  type="number"
                  value={gridConfig.rows}
                  onChange={(e) =>
                    setGridConfig({
                      ...gridConfig,
                      rows: e.target.value,
                    })
                  }
                />
              </span>
              <span>
                <label htmlFor="cols">Columns</label>
                <input
                  type="number"
                  value={gridConfig.columns}
                  onChange={(e) =>
                    setGridConfig({
                      ...gridConfig,
                      columns: e.target.value,
                    })
                  }
                />
              </span>
            </div>
            <button
              type="button"
              onClick={() =>
                setGridConfig({
                  ...gridConfig,
                  isConfirmed: true,
                })
              }
            >
              Accept
            </button>
          </GridConfigContainer>
        )}
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

const GridConfigContainer = styled.div`
  width: 100%;
  max-height: 300px;
  padding: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  > h3 {
    margin-bottom: 10px;
  }
  > div {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 20px;

    > span {
      display: flex;
      flex-direction: column;

      > label {
        margin-bottom: 5px;
      }
    }
  }
`;

export default App;
