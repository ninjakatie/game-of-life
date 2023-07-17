import { useEffect, useState, useCallback } from 'react';
import styles from '@/styles/boardGrid.module.css';

/**
 * @name BoardGrid - the grid of the game
 * @param {number} height - height of the board
 * @param {number} width - width of the board
 * @param {function} setHeight - callback state function used for resetting the game
 * @param {function} setWidth - callback state function used for resetting the game
 * @returns {JSX.Element}
 */
export default function BoardGrid({ height, width, setHeight, setWidth }) {
  const [cellGrid, setCellGrid] = useState([]);
  const [autoPlayOn, setAutoPlayOn] = useState(false);
  const [endOfGame, setEndOfGame] = useState(false);

  // useCallback is needed since the function is a dependency in a useEffect
  // initializes the grid with dead cells based on the passed in height and width values
  const prefillGrid = useCallback(() => {
    const cellsArr = [];

    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        // id is stored as [row, col] for easy future lookup of neighbors
        cellsArr.push({
          id: [row, col],
          alive: false
        });
      }
    }

    setCellGrid(cellsArr);
  }, [height, width]);

  // fires on first render to pre-fill the grid component
  useEffect(() => {
    prefillGrid();
  }, [prefillGrid]);

  // resets the game to display the grid size selection component
  const resetGame = () => {
    setHeight(null);
    setWidth(null);
  };

  // used to check if cellGrid object diverged
  const cellStatusesDiverged = (currStatuses, newStatuses) => {
    if (JSON.stringify(currStatuses) === JSON.stringify(newStatuses)) {
      return false;
    } else {
      return true;
    }
  };

  // gets all the alive neighboring cells of a particular cell
  // wrapped in useCallback since a dependency to a useEffect
  const getNeighboringCells = useCallback(
    cell => {
      const [cellRow, cellCol] = cell?.id;
      const neighbors = [];

      // get all relative neighbors (8 other cells)
      const variants = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
        [1, -1],
        [-1, 1],
        [-1, -1],
        [1, 1]
      ];

      variants.forEach(variant => {
        const neighborRow = cellRow + variant[0];
        const neighborCol = cellCol + variant[1];

        // check for out of bounds
        if (
          neighborRow < height &&
          neighborRow >= 0 &&
          neighborCol < width &&
          neighborCol >= 0
        ) {
          // look up full cell object
          const neighborCell = cellGrid.find(
            cell => cell.id[0] === neighborRow && cell.id[1] === neighborCol
          );

          // we only care about alive cells
          if (neighborCell?.alive) {
            neighbors.push(neighborCell);
          }
        }
      });

      return neighbors;
    },
    [cellGrid, height, width]
  );

  // used to determine which cells need to be udpated according to the game rules
  const updateCells = useCallback(() => {
    const newCellGrid = [];
    // const newCellStatuses = [];

    // we need to copy the state to a new object, since objects store the reference which will change every time each cell is updated, affecting the result.
    const initialCellGrid = cellGrid.map(cell => {
      let newCell = {};
      Object.assign(newCell, cell);

      return newCell;
    });

    initialCellGrid.forEach(cell => {
      const aliveNeighbors = getNeighboringCells(cell);

      // live cells with 2 or 3 live neighbors live on
      // live cells with fewer than 2 or greater than 3 live neighbors die
      if (cell.alive) {
        if (aliveNeighbors.length < 2 || aliveNeighbors.length > 3) {
          cell.alive = false;
        }
      }

      // Dead cells with 3 live neighbors come to life
      if (aliveNeighbors.length === 3 && !cell.alive) {
        cell.alive = true;
      }

      newCellGrid.push(cell);
      // newCellStatuses.push(cell.alive);
    });

    // only trigger state updates if cell statuses have changed.
    // React won't be able to tell if object values are different.
    if (cellStatusesDiverged(cellGrid, newCellGrid)) {
      setCellGrid(newCellGrid);
    } else {
      // we reached the end of the game since there are no more changes.
      setAutoPlayOn(false);
      setEndOfGame(true);
    }
  }, [cellGrid, getNeighboringCells]);

  // triggers auto play of the game
  const autoPlay = () => {
    // need this check to avoid user pressing Play multiple times and re-triggering the game sequence
    if (!autoPlayOn) {
      setAutoPlayOn(true);
      updateCells();
    }
  };

  // used for auto play
  // every time cellGrid is updated, trigger the next move with a 1s delay
  useEffect(() => {
    if (autoPlayOn) {
      setTimeout(() => updateCells(), 1000);
    }
  }, [cellGrid, autoPlayOn, updateCells]);

  // manual selection by user
  const selectCell = cell => {
    const updatedCellGrid = cellGrid.map(c => {
      if (c.id[0] === cell.id[0] && c.id[1] === cell.id[1]) {
        c.alive = !c.alive;
      }
      return c;
    });

    setCellGrid(updatedCellGrid);
    setEndOfGame(false);
  };

  return (
    <div className={styles.root}>
      <div className={styles['button-parent']}>
        <button
          disabled={autoPlayOn}
          onClick={updateCells}
          className={styles.button}
        >
          Next Move
        </button>
        <button className={styles.button} onClick={autoPlay}>
          Play
        </button>
        <button className={styles.button} onClick={() => setAutoPlayOn(false)}>
          Stop
        </button>
      </div>
      <div className='gridRoot'>
        {cellGrid.map(cell => (
          <div
            key={cell.id}
            className={cell.alive ? styles['alive-cell'] : styles.cell}
            onClick={() => selectCell(cell)}
          />
        ))}
      </div>
      <button onClick={resetGame} className={styles.button}>
        Startover
      </button>
      {endOfGame && <div className={styles.end}>The End!</div>}
      <style jsx>
        {`
          .gridRoot {
            display: grid;
            grid-template-columns: repeat(${width}, 35px);
            grid-template-rows: repeat(${height}, 35px);
            margin: 30px;
          }
        `}
      </style>
    </div>
  );
}
