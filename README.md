# ⚡ AlgoVisualizer - Interactive Algorithm Studio & Portfolio

An interactive, high-performance Data Structures and Algorithms (DSA) visualizer built with **Next.js 15**, **React 19**, **TypeScript**, **Tailwind CSS**, **Zustand**, and **Framer Motion**.

Designed and developed by **[Sachin Tiwari](https://github.com/sachin11p12)** to provide step-by-step visual execution, real-time metrics, line-by-line pseudocode playback, and intuitive algorithm theory explanations.

🌐 **Live Preview / Portfolio**: [https://sachin-online.vercel.app/](https://sachin-online.vercel.app/)

---

## 🌟 Key Features

- 📊 **Sorting Algorithms**: Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort, and Heap Sort.
- 🔍 **Searching Algorithms**: Linear Search and Binary Search (with target highlight & active range tracking).
- 🎬 **Full Playback Controls**: Play, Pause, Resume, Step Forward, Step Backward, and Reset.
- ⚡ **Dynamic Speed Control**: Adjust playback speed smoothly from `0.25x` to `4x`.
- 📈 **Real-Time Metrics**: Track live comparison counts, swap counts, step indexes, and execution duration.
- 📝 **Synchronized Pseudocode Engine**: Active line highlighting synced 1-to-1 with visual array bar swaps.
- 🎨 **Sleek Aesthetic & Light/Dark Theme**: Seamless theme toggling with accessible contrast ratios in both modes.
- 🎯 **Custom Array Input**: Modal to enter custom comma-separated numbers or generate random arrays.
- 💼 **Integrated Portfolio & Resume**: Dedicated `/` portfolio page, `/algo` visualizer studio, and `/resume` printable document page.

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router & Dynamic Routes) |
| **UI Library** | [React 19](https://react.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) (Vanilla CSS Variables & Glassmorphism) |
| **State Management** | [Zustand](https://zustand-demo.pmnd.rs/) |
| **Animation Engine** | [Framer Motion](https://www.framer.com/motion/) (Spring Physics & Layout Transitions) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Theme Provider** | [next-themes](https://github.com/pacocoursey/next-themes) |

---

## 📂 Project Structure

```text
Algo-Visualizer/
├── Project-Workflow.md          # Comprehensive workflow & architecture document
├── README.md                    # Project documentation
└── Frontend/                    # Next.js 15 Application Source
    ├── app/                     # Next.js App Router pages
    │   ├── page.tsx             # Main Portfolio & Resume Showcase (`/`)
    │   ├── algo/                # Algorithm Visualizer Catalog (`/algo`)
    │   ├── sorting/[algorithm]/ # Dynamic Sorting Visualizer route
    │   ├── searching/[algorithm]/# Dynamic Searching Visualizer route
    │   ├── resume/              # Printable ATS-friendly Resume (`/resume`)
    │   ├── globals.css          # Core CSS variables & theme tokens
    │   └── layout.tsx           # Root layout with ThemeProvider
    ├── components/              # Modular UI Components
    │   ├── layout/              # Header, Footer, Sidebar, ThemeProvider
    │   └── visualizer/          # Canvas, ControlPanel, StatsPanel, PseudocodePanel, Details
    ├── lib/                     # Utilities & Algorithm Logic
    │   ├── algorithmData.ts     # Metadata, pseudocode & theory definitions
    │   ├── types.ts             # TypeScript interfaces & types
    │   ├── utils.ts             # Random array generators & array parsers
    │   └── algorithms/          # Step-generation algorithms (Bubble, Quick, Binary, etc.)
    ├── store/                   # Global State
    │   └── useVisualizerStore.ts# Zustand store tracking playback state & array steps
    └── public/                  # Static assets & PDF resume documents
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **yarn**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sachin11p12/Algorithm-Visualizer.git
   cd Algorithm-Visualizer/Frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. Open **`http://localhost:3000`** in your browser.

---

## 👨‍💻 Author

**Sachin Tiwari**
- **Portfolio**: [https://sachin-online.vercel.app/](https://sachin-online.vercel.app/)
- **Email**: [sachin11p12@gmail.com](mailto:sachin11p12@gmail.com)
- **GitHub**: [@sachin11p12](https://github.com/sachin11p12)
- **LinkedIn**: [sachin-tiwari-18s21](https://linkedin.com/in/sachin-tiwari-18s21)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
