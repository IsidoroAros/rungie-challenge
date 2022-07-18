/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

function Tile({
  requestColorChange,
  setRequestColorChange,
  gridRef,
  gridSize,
  clickedColumn,
  setClickedColumn,
}) {
  const [currentAction, setCurrentAction] = useState("");
  const [tileHovered, setTileHovered] = useState(false);
  const timerRef = useRef();
  const isLongPress = useRef();
  const triggerTile = useRef();

  // Whenever the user requests to set the colors on the board resets some states to zero
  useEffect(() => {
    if (!requestColorChange) {
      setRequestColorChange(false);
      triggerTile.current = undefined;
      setTileHovered(false);
    }
  }, [requestColorChange]);

  // Whenever a tile is double clicked alters the column and returns it to initial state after a while
  useEffect(() => {
    if (clickedColumn.includes(gridRef)) setTileHovered(true);
  }, [clickedColumn]);

  const handleOnMouseDown = () => startPressTimer();
  const handleOnMouseUp = () => clearTimeout(timerRef.current);
  const handleDoubleClick = () => {
    calculateClickedColumns();
    setRequestColorChange(true);
  };

  // Starts the timer for the tile
  const startPressTimer = () => {
    isLongPress.current = false;
    timerRef.current = setTimeout(() => {
      isLongPress.current = true;
      setCurrentAction("longpress");
    }, 1000);
  };

  // Calculates the column position when doubleClick
  const calculateClickedColumns = () => {
    const { columns, rows } = gridSize;
    setClickedColumn([]);
    setClickedColumn((clickedColumn) => [...clickedColumn, gridRef]);
    for (let i = 0; i < rows; i += 1) {
      const sumref = gridRef + columns * (i + 1);
      const subsref = gridRef - columns * (i + 1);

      if (sumref >= 0 && sumref <= columns * rows) {
        if (gridRef === 0 && sumref === columns * rows) return;
        setClickedColumn((clickedColumn) => [...clickedColumn, sumref]);
      }
      if (subsref >= 0 && subsref <= columns * rows) {
        setClickedColumn((clickedColumn) => [...clickedColumn, subsref]);
      }
    }
  };

  // Handles color flip on regular click
  const handleOnClick = () => {
    if (isLongPress.current) return;
    setCurrentAction("click");
    setTileHovered(!tileHovered);
  };

  // Handles when element starts drag action
  const handleDragStart = (e) => {
    triggerTile.current = e.target;
  };

  // Set color to the tile when drag is ocurring
  const handleDragOver = (e) => {
    if (triggerTile.current !== e.target) setTileHovered(true);
  };

  // Set color to genesis when drag is over
  const handleDragEnd = () => {
    setTileHovered(true);
    setRequestColorChange(true);
    setCurrentAction("");
  };

  return (
    <StyledTile
      draggable
      currentAction={currentAction}
      tileLifecycle={tileHovered}
      requestColorChange={requestColorChange}
      onClick={handleOnClick}
      onMouseUp={handleOnMouseUp}
      onMouseDown={(e) => handleOnMouseDown(e)}
      onDragStart={(e) => handleDragStart(e)}
      onDragOver={(e) => handleDragOver(e)}
      onDragEnd={(e) => handleDragEnd(e)}
      onDoubleClick={handleDoubleClick}
      tileHovered={tileHovered}
    />
  );
}

const StyledTile = styled.div`
  cursor: pointer;
  height: auto;
  width: auto;
  border-radius: 5px;
  transition: 0.2s ease-in-out;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  background: ${({ tileHovered }) =>
    tileHovered
      ? "linear-gradient(90deg, rgba(183,219,233,1) 0%, rgba(242,241,239,1) 100%)"
      : "linear-gradient(231deg, rgba(156,207,132,1) 0%, rgba(175,217,231,1) 100%)"};
  transform: ${({ tileHovered }) => (tileHovered ? "scale(0.9)" : "scale(1)")};
`;

Tile.propTypes = {
  requestColorChange: PropTypes.bool.isRequired,
  setRequestColorChange: PropTypes.func.isRequired,
  gridRef: PropTypes.number.isRequired,
  gridSize: PropTypes.objectOf(PropTypes.number).isRequired,
  clickedColumn: PropTypes.arrayOf(PropTypes.number),
  setClickedColumn: PropTypes.func.isRequired,
};

Tile.defaultProps = {
  clickedColumn: [],
};

export default Tile;
