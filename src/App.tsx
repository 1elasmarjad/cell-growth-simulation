import { useState } from "react";
import "./App.css";
import { CellData } from "./hooks/useGridController";
import Game from "./components/game";

function App() {
  const [gridSize, setGridSize] = useState<number>(20);

  const [grid, setGrid] = useState<CellData[][]>(() =>
    Array.from({ length: gridSize }, () =>
      Array.from({ length: gridSize }, () => ({
        occupied: Math.random() < 0.2,
        age: 0,
      }))
    )
  );

  return <Game grid={grid} setGrid={setGrid} gridSize={gridSize} />;
}

export default App;
