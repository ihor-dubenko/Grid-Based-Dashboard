import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DashboardProvider } from './context/DashboardContext.tsx';
import { Dashboard } from './components/Dashboard/Dashboard.tsx';

function App() {
  return (
      <DndProvider backend={HTML5Backend}>
          <DashboardProvider>
              <Dashboard />
          </DashboardProvider>
      </DndProvider>
  )
}

export default App
