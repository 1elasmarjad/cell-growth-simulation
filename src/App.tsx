import React, { Profiler } from "react";
import { useState } from "react";
import "./App.css";
import { CellData } from "./hooks/useGridController";
import Game from "./components/game";

function App() {
  function onRenderCallback(
    id: string,
    phase: "mount" | "update" | "nested-update",
    actualDuration: number,
    baseDuration: number,
    startTime: number,
    commitTime: number
  ) {
    // console.log({
    //   id,
    //   phase,
    //   actualDuration,
    //   baseDuration,
    //   startTime,
    //   commitTime,
    // });
  }

  const [gridSize, setGridSize] = useState<number>(20);

  const [grid, setGrid] = useState<CellData[][]>(generateGrid);

  function generateGrid() {
    return Array.from({ length: gridSize }, () =>
      Array.from({ length: gridSize }, () => ({
        occupied: Math.random() < 0.2,
        age: 0,
      }))
    );
  }

  return (
    <Profiler onRender={onRenderCallback} id="game">
      <div className="game-container">
        <Game
          grid={grid}
          setGrid={setGrid}
          gridSize={gridSize}
          resetGrid={() => {
            setGrid(generateGrid());
          }}
        />
      </div>
    </Profiler>
  );
}

export default App;
