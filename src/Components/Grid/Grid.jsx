import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Tile from "../Tile/Tile";

function Grid({ gridRows, gridColumns }) {
  const [requestColorChange, setRequestColorChange] = useState(false);
  const [columnUpdater, setColumnUpdater] = useState();
  const [clickedColumn, setClickedColumn] = useState([]);

  return (
    <>
      <TileGrid gridColumns={gridColumns} gridRows={gridRows}>
        {Array.from({ length: gridColumns * gridRows }).map((_item, index) => (
          <Tile
            requestColorChange={requestColorChange}
            setRequestColorChange={setRequestColorChange}
            gridRef={index}
            key={`tile-${index + 1}`}
            columnUpdater={columnUpdater}
            setColumnUpdater={setColumnUpdater}
            gridSize={{ rows: gridRows, columns: gridColumns }}
            clickedColumn={clickedColumn}
            setClickedColumn={setClickedColumn}
          />
        ))}
      </TileGrid>
      <ConfirmActionsContainer>
        <ConfirmActions onClick={() => setRequestColorChange(false)}>
          Reset
        </ConfirmActions>
      </ConfirmActionsContainer>
    </>
  );
}

const TileGrid = styled.div`
  height: 80%;
  width: 100%;
  gap: 8px;
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(${({ gridColumns }) => gridColumns}, 1fr);
  grid-template-rows: repeat(${({ gridRows }) => gridRows}, 1fr);
`;

const ConfirmActionsContainer = styled.span`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;

  > span {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    border: 2px solid red;
  }

  span:first-child {
    margin-right: 8px;
  }
`;

const ConfirmActions = styled.button`
  width: 30%;
  max-width: 200px;
  outline: none;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  background: #fefdfc;
  padding: 10px 20px;
  cursor: pointer;
`;

Grid.propTypes = {
  gridRows: PropTypes.number,
  gridColumns: PropTypes.number,
};

Grid.defaultProps = {
  gridRows: 5,
  gridColumns: 5,
};

export default Grid;
