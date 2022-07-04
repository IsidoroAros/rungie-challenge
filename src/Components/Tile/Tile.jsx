/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

function Tile({
  requestColorChange,
  setRequestColorChange,
  gridRef,
  columnUpdater,
  setColumnUpdater,
  gridSize,
  clickedColumn: columnGroup,
  setClickedColumn,
}) {
  const [currentAction, setCurrentAction] = useState("");
  const [tileLifecycle, setTileLifecycle] = useState({
    init: false,
    hover: false,
  });
  const timerRef = useRef();
  const isLongPress = useRef();
  const triggerTile = useRef();

  useEffect(() => {
    if (!requestColorChange) {
      setTileLifecycle({
        init: true,
        hover: false,
      });
      setRequestColorChange(false);
      triggerTile.current = undefined;
    }
  }, [requestColorChange]);

  useEffect(() => {}, [columnUpdater]);

  // Starts the timer for the tile
  const startPressTimer = () => {
    isLongPress.current = false;
    timerRef.current = setTimeout(() => {
      isLongPress.current = true;
      setCurrentAction("longpress");
    }, 1000);
  };

  const handleOnMouseDown = () => startPressTimer();
  const handleOnMouseUp = () => clearTimeout(timerRef.current);

  const calculateColumnLayout = () => {
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

  const handleOnClick = () => {
    if (isLongPress.current) return;
    setCurrentAction("click");
    setTileLifecycle({
      init: false,
      hover: !tileLifecycle.hover,
    });
  };

  const handleDragStart = (e) => {
    setTileLifecycle({
      init: true,
      hover: false,
    });
    triggerTile.current = e.target;
  };

  const handleDragOver = () => {
    setTileLifecycle({
      init: false,
      hover: true,
    });
  };

  const handleDragEnd = (e) => {
    e.stopPropagation();
    setTileLifecycle({
      init: false,
      trigger: false,
      hover: true,
    });
    setRequestColorChange(true);
    setCurrentAction("");
  };

  const handleDoubleClick = () => {
    setColumnUpdater(gridRef);
    calculateColumnLayout(gridSize);
    if (columnGroup.includes(gridRef)) {
      // Add logic for painting tiles for double click column
    }
  };

  return (
    <StyledTile
      currentAction={currentAction}
      tileLifecycle={tileLifecycle}
      requestColorChange={requestColorChange}
      onClick={handleOnClick}
      onMouseUp={handleOnMouseUp}
      onMouseDown={(e) => handleOnMouseDown(e)}
      onDragStart={(e) => handleDragStart(e)}
      onDragOver={(e) => handleDragOver(e)}
      onDragEnd={(e) => handleDragEnd(e)}
      onDoubleClick={handleDoubleClick}
      style={{
        background: `${
          tileLifecycle.init
            ? "rgba(156,207,132,1)"
            : tileLifecycle.hover
            ? "linear-gradient(90deg, rgba(183,219,233,1) 0%, rgba(242,241,239,1) 100%)"
            : "rgba(156,207,132,1)"
        }`,
        transform: `${tileLifecycle.hover ? "scale(0.9)" : "scale(1)"}`,
      }}
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
`;

Tile.propTypes = {
  requestColorChange: PropTypes.bool.isRequired,
  setRequestColorChange: PropTypes.func.isRequired,
  gridRef: PropTypes.number.isRequired,
  setColumnUpdater: PropTypes.func.isRequired,
  columnUpdater: PropTypes.number,
  gridSize: PropTypes.objectOf(PropTypes.number).isRequired,
  clickedColumn: PropTypes.arrayOf(PropTypes.number),
  setClickedColumn: PropTypes.func.isRequired,
};

Tile.defaultProps = {
  columnUpdater: undefined,
  clickedColumn: [],
};

export default Tile;
