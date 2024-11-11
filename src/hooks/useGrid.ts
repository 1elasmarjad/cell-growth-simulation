import { useEffect, useState } from "react";

export type CellData = {
  occupied: boolean; // alive or dead
  age: number; // the age of the cell in seconds; this resets to 0 when the cell is no longer occupied
};

const DEFAULT_DIVIDE_INTERVAL = 1000;

export function useGrid({ rows, cols }: { rows: number; cols: number }) {
  const [grid, setGrid] = useState<CellData[][]>(() =>
    Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => ({ occupied: true, age: 0 }))
    )
  );

  const [divideInterval, setDivideInterval] = useState<number>(
    DEFAULT_DIVIDE_INTERVAL
  );
  const [lifeSpan, setLifeSpan] = useState<number>(6);
  const [divisonProbability, setDivisionProbability] = useState<number>(0.5);

  useEffect(() => {
    const interval = setInterval(() => {}, divideInterval);

    return () => clearInterval(interval); // cleanup when the component unmounts
  }, [divideInterval, lifeSpan]);

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
