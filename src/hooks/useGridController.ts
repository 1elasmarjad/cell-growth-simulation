import { useEffect } from "react";

export type CellData = {
  occupied: boolean; // alive or dead
  age: number; // the age of the cell in seconds; this resets to 0 when the cell is no longer occupied
};

export function useGridController({
  rows,
  cols,
  paused,
  grid,
  setGrid,
  options,
}: {
  rows: number;
  cols: number;
  paused: boolean;
  grid: CellData[][];
  setGrid: React.Dispatch<React.SetStateAction<CellData[][]>>;
  options: {
    divideInterval: number;
    lifeSpan: number;
    divisionProbability: number;
  };
}) {
  useEffect(() => {
    if (paused) return; // do nothing if paused

    const interval = setInterval(() => {
      setGrid((prevGrid) => {
        const newGrid = [...prevGrid];
        for (let row = 0; row < rows; row++) {
          newGrid[row] = [...prevGrid[row]];

          for (let col = 0; col < cols; col++) {
            const oldData = prevGrid[row][col];

            if (!oldData.occupied) continue; // skip empty cells

            const newAge = oldData.age + 1; // increment cell age

            if (newAge >= options.lifeSpan) {
              newGrid[row][col] = {
                occupied: false, // kill the cell
                age: 0,
              };
            } else {
              // increase the age of the cell
              newGrid[row][col] = {
                ...oldData,
                age: newAge,
              };

              const neighborLocations = [
                [row - 1, col], // up
                [row + 1, col], // down
                [row, col - 1], // left
                [row, col + 1], // right
              ];

              // find empty neighbors
              const emptyNeighbors = neighborLocations.filter(
                ([r, c]) =>
                  r >= 0 &&
                  r < rows &&
                  c >= 0 &&
                  c < cols &&
                  !prevGrid[r][c].occupied
              );

              if (emptyNeighbors.length === 0) continue; // no empty neighbors

              for (const loc of emptyNeighbors) {
                const [r, c] = loc; // location of the empty neighbor

                if (Math.random() < options.divisionProbability) {
                  newGrid[r][c] = {
                    occupied: true, // create a new cell
                    age: 0,
                  };
                }
              }
            }
          }
        }
        return newGrid;
      });
    }, options.divideInterval);

    return () => clearInterval(interval); // cleanup when the component unmounts
  }, [
    cols,
    options.divideInterval,
    options.divisionProbability,
    options.lifeSpan,
    paused,
    rows,
    setGrid,
  ]);

  // gets cell data at a specific row and column
  function getCell(row: number, col: number): CellData {
    return grid[row][col];
  }

  // sets cell data at a specific row and column
  function toggleCell(row: number, col: number) {
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      newGrid[row] = [...prevGrid[row]];

      const oldData = prevGrid[row][col];

      newGrid[row][col] = {
        ...oldData,
        occupied: !oldData.occupied,
      };

      return newGrid;
    });
  }

  return {
    getCell,
    toggleCell,
  };
}
