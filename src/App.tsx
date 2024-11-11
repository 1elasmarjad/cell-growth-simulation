import { useState } from "react";
import "./App.css";
import Cell from "./components/cell";
import { useGrid } from "./hooks/useGrid";

function App() {
  const [gridSize, setGridSize] = useState<number>(10);

  const { grid, getCell } = useGrid({
    rows: gridSize,
    cols: gridSize,
  });

  return (
    <div className="rows">
      {Array.from({ length: gridSize }).map((_, rowIndex) => (
        <div className="columns">
          {Array.from({ length: gridSize }).map((_, colIndex) => (
            <Cell
              row={rowIndex}
              col={colIndex}
              occupied={getCell(rowIndex, colIndex).occupied}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
