# Project Workflow & Architecture

A concise technical guide to the **Algorithm Visualizer** architecture, stack, and execution workflow.

---

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router, React 19, TypeScript)
- **State Management**: Zustand
- **Animations**: Framer Motion (60 FPS layout animations)
- **Styling**: Tailwind CSS & Vanilla CSS (Glassmorphism & Dark/Light mode via `next-themes`)
- **Icons**: Lucide React

---

## 📁 Project Structure (`./Frontend`)

```
Frontend/
├── app/
│   ├── layout.tsx              # Root fonts, metadata & ThemeProvider
│   ├── page.tsx                # Main Visualizer dashboard page
│   └── globals.css             # Theme tokens, custom scrollbars & glass styling
├── components/
│   ├── layout/                 # Header, Sidebar explorer & theme toggle
│   └── visualizer/             # Canvas, Control Panel, Stats, Pseudocode & Details
├── lib/
│   ├── types.ts                # TypeScript interfaces for steps, highlights & metadata
│   ├── algorithmData.ts        # Complexities, descriptions & pseudocode strings
│   ├── utils.ts                # Random array generators & array parser
│   └── algorithms/             # Pure step generator functions
│       ├── bubbleSort.ts, selectionSort.ts, insertionSort.ts
│       ├── mergeSort.ts, quickSort.ts, heapSort.ts
│       └── linearSearch.ts, binarySearch.ts
└── store/
    └── useVisualizerStore.ts   # Central Zustand state & playback animation engine
```

---

## ⚡ Execution Workflow

```
[User Action] (Select Algo / Change Array / Click Play)
       │
       ▼
[Algorithm Module] ──► Generate Step Frames Array (Pre-computation)
       │
       ▼
[Zustand Store] ─────► Manage Playback Index, Speed, Timer Ticks & State
       │
       ▼
[UI Components] ─────► Render Animated Bars (Framer Motion), Pseudocode & Stats
```

1. **Step Generation**: When an algorithm or array changes, pure functions in `lib/algorithms/` run and record an array of `AlgorithmStep` snapshots (array state, active highlights, pseudocode line index, comparisons, and swaps).
2. **State Control**: `useVisualizerStore` manages step playback (`play`, `pause`, `stepForward`, `stepBackward`), timer ticks scaled by speed (`0.25x`–`4x`), and custom inputs.
3. **Visual Rendering**:
   - `VisualizerCanvas`: Renders proportional bar graph heights with active color highlights (`comparing`, `swapping`, `sorted`).
   - `PseudocodePanel`: Highlights the executing pseudocode line.
   - `StatsPanel`: Displays live comparisons, swaps, elapsed time, and progress.
