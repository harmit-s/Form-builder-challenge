import React from "react";
import FormBuilder from "./components/FormBuilder/FormBuilder.jsx"
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';

function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <FormBuilder />
      </DndProvider>,

    </div>
  );
}

export default App;