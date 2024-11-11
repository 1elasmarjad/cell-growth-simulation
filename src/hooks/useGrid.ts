import { useEffect, useState } from "react";

export type CellData = {
  occupied: boolean; // alive or dead
  age: number; // the age of the cell in seconds; this resets to 0 when the cell is no longer occupied
};

const DEFAULT_DIVIDE_INTERVAL = 1000;

export function useGrid({ rows, cols }: { rows: number; cols: number }) {
  const [grid, setGrid] = useState<CellData[][]>(() =>
    Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => ({
        occupied: Math.random() < 0.2,
        age: 0,
      }))
    )
  );

  const [divideInterval, setDivideInterval] = useState<number>(
    DEFAULT_DIVIDE_INTERVAL
  );
  const [lifeSpan, setLifeSpan] = useState<number>(6);
  const [divisionProbability, setDivisionProbability] = useState<number>(0.5);

  useEffect(() => {
    const interval = setInterval(() => {
      setGrid((prevGrid) => {
        const newGrid = [...prevGrid];
        for (let row = 0; row < rows; row++) {
          newGrid[row] = [...prevGrid[row]];

          for (let col = 0; col < cols; col++) {
            const oldData = prevGrid[row][col];

            if (!oldData.occupied) continue; // skip empty cells

            const newAge = oldData.age + 1; // increment cell age

            console.log(newAge);

            if (newAge >= lifeSpan) {
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

                if (Math.random() < divisionProbability) {
                  newGrid[r] = [...prevGrid[r]];
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
    }, divideInterval);

    return () => clearInterval(interval); // cleanup when the component unmounts
  }, [cols, divideInterval, lifeSpan, rows]);

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
    grid,
    getCell,
    setDivideInterval,
    setCell: toggleCell,
  };
}
