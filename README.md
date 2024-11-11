# Summary

Full Stack Engineering Challenge: O241. This project simulates the growth of a bacterial colony based on specific rules. Users are able to start, pause, reset and adjust different variables in the simulation.

# Code Explanation

The React hook `useGridController` manages the majority of the logic of the bacterial colony simulation. It is the "main" controller which manipulates the grid state every `divideInterval` seconds. The `useEffect` in this hook will perform cell division, kill cells, etc. The `Game` component houses the rendering of the game and the `Controls` component, which allows for users to control the simulation.

# Assumptions

- I made the assumption of setting the grid size to 20x20 cells. The grid should be large enough for meaningful interaction, but enough to avoid performance issues.
- The default probability for cell spawns is not provided, so I chose a default value that provided the most meaningful simulation.

# Performance Analysis
- Using Google Chromes performence tools, the JS heap size is 35.2-64.0 mb, initially starting at 64.0 mb and averaging around ~40.0 mb. 
- The Largest Contentful Paint was 413 ms, and the local Cumulative Layout Shift value was 0.
- Using react profiler, on mount the actual duration is ~17.5 s whereas the base duration is ~11 s.
- During the average re-render/update, the actual duration is ~10 s and the base duration is ~9 s

![image](https://github.com/user-attachments/assets/cbdeb57b-2eb8-4f64-ab72-4247353c6b61)
![image](https://github.com/user-attachments/assets/150e2a4b-85c4-4b22-8b98-7d4753f17ba7)

