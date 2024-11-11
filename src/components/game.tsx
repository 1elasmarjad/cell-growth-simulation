import { useState } from "react";
import {
  CellData,
  useGridController,
} from "../hooks/useGridController";
import Cell from "./cell";

export default function Game({
  grid,
  gridSize,
  setGrid,
}: {
  grid: CellData[][];
  setGrid: React.Dispatch<React.SetStateAction<CellData[][]>>;
  gridSize: number;
}) {
  const [paused, setPaused] = useState<boolean>(true);

  const { getCell, setCell } = useGridController({
    grid,
    rows: gridSize,
    cols: gridSize,
    paused,
    setGrid,
  });

  return (
    <div className="rows root-reset">
      {Array.from({ length: gridSize }).map((_, rowIndex) => (
        <div className="columns">
          {Array.from({ length: gridSize }).map((_, colIndex) => (
            <button onClick={() => setCell(rowIndex, colIndex)}>
              <Cell
                row={rowIndex}
                col={colIndex}
                occupied={getCell(rowIndex, colIndex).occupied}
              />
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
