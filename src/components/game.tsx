import { useState } from "react";
import { CellData, useGridController } from "../hooks/useGridController";
import Cell from "./cell";
import Controls from "./controls";

export default function Game({
  grid,
  gridSize,
  setGrid,
  resetGrid,
}: {
  grid: CellData[][];
  setGrid: React.Dispatch<React.SetStateAction<CellData[][]>>;
  gridSize: number;
  resetGrid: () => void;
}) {
  const [paused, setPaused] = useState<boolean>(true);

  const [divideInterval, setDivideInterval] = useState<number>(1000);
  const [lifeSpan, setLifeSpan] = useState<number>(6);
  const [divisionProbability, setDivisionProbability] = useState<number>(0.1);

  const { getCell, toggleCell } = useGridController({
    grid,
    rows: gridSize,
    cols: gridSize,
    paused,
    setGrid,
    options: {
      divideInterval,
      lifeSpan,
      divisionProbability,
    },
  });

  return (
    <>
      <div className="grid-parent">
        <div className="rows">
          {Array.from({ length: gridSize }).map((_, rowIndex) => (
            <div className="columns">
              {Array.from({ length: gridSize }).map((_, colIndex) => (
                <button
                  onClick={() => toggleCell(rowIndex, colIndex)}
                  className="cell-btn"
                >
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
      </div>

      <Controls
        paused={paused}
        togglePaused={() => {
          setPaused((prev) => !prev);
        }}
        reset={resetGrid}
        lifespan={lifeSpan}
        setLifeSpan={setLifeSpan}
        divideInterval={divideInterval}
        setDivideInterval={setDivideInterval}
        divisionProbability={divisionProbability}
        setDivisionProbability={setDivisionProbability}
      />
    </>
  );
}
