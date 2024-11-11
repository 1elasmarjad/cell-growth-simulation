import { useState } from "react";
import "./App.css";
import Cell from "./components/cell";
import { useGrid } from "./hooks/useGrid";

function App() {
  const [gridSize, setGridSize] = useState<number>(20);

  const { grid, getCell, setCell } = useGrid({
    rows: gridSize,
    cols: gridSize,
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

export default App;
