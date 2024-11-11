# Summary

Full Stack Engineering Challenge: O241. This project simulates the growth of a bacterial colony based on specific rules. Users are able to start, pause, reset and adjust different variables in the simulation.

# Code Explanation

The React hook `useGridController` manages the majority of the logic of the bacterial colony simulation. It is the "main" controller which manipulates the grid state every `divideInterval` seconds. The `useEffect` in this hook will perform cell division, kill cells, etc. The `Game` component houses the rendering of the game and the `Controls` component, which allows for users to control the simulation.

# Assumptions

- I made the assumption of setting the grid size to 20x20 cells. The grid should be large enough for meaningful interaction, but enough to avoid performance issues.
- The default probability for cell spawns is not provided, so I chose a default value that provided the most meaningful simulation.

# Performance Analysis
