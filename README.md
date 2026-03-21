# MaxxArena

MaxxArena is an interactive coding and typing practice application that blends the immersive, professional coding environment of VS Code with the inline, responsive typing experience of Monkeytype. It offers a full-screen, responsive, two-panel layout to practice writing code efficiently and beautifully.

## 🚀 Features

- **Full-Screen Dual-Panel Layout**: 
  - **Left Panel**: Dedicated to problem information. Displays the title, problem description, and language selection.
  - **Right Panel**: The main typing/coding arena with real-time feedback.
- **Inline Typing Experience**: Type code at lightning speeds with an experience akin to Monkeytype.
- **Theme Toggle (Light/Dark Mode)**: Supports both light and dark modes customized with a unique cartoon-style design approach and seamless transitions.
- **Immersive User Interface**: Features an animated background grid with floating orbs and carefully crafted styles prioritizing visual excellence and responsive design.
- **Timer and Results**: Built-in timer system and result evaluation pages to track performance and speed.

## 🛠️ Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: Vanilla CSS & [Tailwind CSS 4](https://tailwindcss.com/)
- **Code Editor / Arena**: [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- **Routing**: React Router DOM (v7)

## 📁 Project Structure

```bash
src/
├── components/   # Reusable UI components (Timer, ThemeToggle, etc.)
├── data/         # Mock data or constant problem definitions
├── pages/        # Main application views (HomePage, ProblemPage, ResultPage)
├── App.jsx       # Root component mapping the layout and routes
├── index.css     # Global styles and tailwind directives
└── main.jsx      # Application entrypoint
```

## 💻 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository (if you haven't already):
   ```bash
   git clone <repository-url>
   cd MaxxArena
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the address shown in your terminal (typically `http://localhost:5173/`).

## 🎨 Design Philosophy
MaxxArena focuses heavily on visual engagement and aesthetic excellence. By mixing vibrant colors, smooth transitions, glassmorphism UI traits, and premium micro-animations, the application engages the user continuously, turning a simple typing practice task into a delightful gaming-like experience.
