import { useState } from "react";
import "./App.css";
import { CellData } from "./hooks/useGridController";
import Game from "./components/game";

function App() {
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
  );
}

export default App;
