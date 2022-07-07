import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Tile from "./Tile";
import { postSquares } from "../Services/Endpoint.service";

function Grid({ gridRows, gridColumns, setGridConfig }) {
  const [requestColorChange, setRequestColorChange] = useState(false);
  const [clickedColumn, setClickedColumn] = useState([]);

  useEffect(() => {
    if (requestColorChange) postSquares(clickedColumn);
  }, [requestColorChange]);

  return (
    <>
      <TileGrid gridColumns={gridColumns} gridRows={gridRows}>
        {Array.from({ length: gridColumns * gridRows }).map((_item, index) => (
          <Tile
            requestColorChange={requestColorChange}
            setRequestColorChange={setRequestColorChange}
            gridRef={index}
            key={`tile-${index + 1}`}
            gridSize={{ rows: gridRows, columns: gridColumns }}
            clickedColumn={clickedColumn}
            setClickedColumn={setClickedColumn}
          />
        ))}
      </TileGrid>
      <ConfirmActionsContainer>
        <button
          type="button"
          onClick={() => {
            setClickedColumn([]);
            setRequestColorChange(false);
          }}
        >
          Reset values
        </button>
        <button
          type="button"
          onClick={() =>
            setGridConfig({
              rows: 5,
              columns: 5,
              isConfirmed: false,
            })
          }
        >
          New layout
        </button>
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
`;

Grid.propTypes = {
  gridRows: PropTypes.number,
  gridColumns: PropTypes.number,
  setGridConfig: PropTypes.func.isRequired,
};

Grid.defaultProps = {
  gridRows: 5,
  gridColumns: 5,
};

export default Grid;
