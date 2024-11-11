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

  useEffect(() => {
    const interval = setInterval(() => {
      // this runs every "divideInterval" milliseconds
      // TODO
    }, divideInterval);

    return () => clearInterval(interval); // cleanup when the component unmounts
  }, [divideInterval]);

  // gets cell data at a specific row and column
  function getCell(row: number, col: number): CellData {
    return grid[row][col];
  }

  return {
    grid,
    getCell,
    setDivideInterval,
  };
}
