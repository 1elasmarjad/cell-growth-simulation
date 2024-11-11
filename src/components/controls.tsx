export default function Controls({
  paused,
  togglePaused,
  reset,
  lifespan,
  setLifeSpan,
  divideInterval,
  setDivideInterval,
  divisionProbability,
  setDivisionProbability,
}: {
  paused: boolean;
  togglePaused: () => void;
  reset: () => void;

  lifespan: number;
  setLifeSpan: (value: number) => void;

  divideInterval: number;
  setDivideInterval: (value: number) => void;

  divisionProbability: number;
  setDivisionProbability: (value: number) => void;
}) {
  return (
    <div className="controls">
      <div className="time-controls">
        <button onClick={togglePaused}>{paused ? "Play" : "Pause"}</button>
        <button onClick={reset}>Reset</button>
      </div>

      <div>
        <label htmlFor="speed">Division Slowness</label>
        <input
          name="speed"
          type="range"
          min="100"
          max="10000"
          value={divideInterval}
          onChange={(e) => {
            setDivideInterval(parseInt(e.target.value));
          }}
        />
      </div>

      <div>
        <label htmlFor="lifespan">Lifespan</label>
        <input
          name="lifespan"
          type="range"
          min="0"
          max="15"
          value={lifespan}
          onChange={(e) => {
            setLifeSpan(parseInt(e.target.value));
          }}
        />
      </div>

      <div>
        <label htmlFor="divprob">Division Probability</label>
        <input
          name="divprob"
          type="number"
          min="0"
          max="1"
          step="0.01"
          value={divisionProbability}
          onChange={(e) => {
            setDivisionProbability(parseFloat(e.target.value));
          }}
        />
      </div>
    </div>
  );
}
