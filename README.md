# Grid-Based Dashboard

**A React + TypeScript application for managing blocks on a 3-column grid canvas with drag-and-drop functionality.**

## Features

- **3-Column Grid Layout**: Fixed 3-column width with unlimited vertical height
- **Block Types**: Line Chart, Bar Chart, and Text Block
- **Add Blocks**: Automatically placed in the first available empty cell
- **Delete Blocks**: Hover over a block to reveal the delete button
- **Drag & Drop**: Move blocks to empty cells with visual feedback
- **Pure CSS Styling**: No CSS-in-JS or CSS frameworks

## Tech Stack

- React 19.2.0
- TypeScript 5.9.3
- Vite 7.2.4
- react-dnd 16.0.1 (drag and drop)
- recharts 3.5.1 (charts visualization)

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

## Installation

### Using npm
npm install
### Using yarn
yarn install

## Running the Application
### Using npm
`npm run dev`
### Using yarn
`yarn dev`

## Building for Production
### Using npm
`npm run build`
### Using yarn
`yarn build`

## Lint
### Using npm
`npm run lint`
### Using yarn
`yarn lint`

## Preview (production build)
### Using npm
`npm run preview`
### Using yarn
`yarn preview`

## Usage

### Adding Blocks
#### Use the buttons at the top to add blocks:
- Add Line Chart: Creates a line chart block with mock data
- Add Bar Chart: Creates a bar chart block with mock data
- Add Text Block: Creates a text block with sample content
- Blocks are automatically placed in the first available empty cell (left to right, top to bottom)

### Deleting Blocks
- Hover over any block to reveal the delete button (×) in the top-right corner
- Click the delete button to remove the block from the canvas

### Moving Blocks
- Click and drag any block to move it
- Drop it into an empty cell (visual feedback shows valid drop zones)
- Dragging into occupied cells is not allowed

## Project Structure
```
src/
├── components/       # React components
├── constants/        # Application constants and configuration
├── context/          # React Context for state management
├── hooks/            # Custom React hooks
└── models/           # TypeScript interfaces, types, and data structures for application entities
```

## State Management
- `useState` for local component state.
- React Context for global state sharing

## License

This project is licensed under the MIT License - see below for details:

MIT License
Copyright (c) 2025 Ihor Dubenko
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
