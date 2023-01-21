import React from 'react';
import { GlobalContextProvider } from './store/GlobalContextProvider';
import { HomePage } from './components/HomePage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { VariableList } from './components/VariablesList';
import { VariablesContextProvider } from './store/VariablesContext';
import { VariableDescription } from './components/VariableDescription';

function App() {
  return (
    <GlobalContextProvider>
      <VariablesContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path='*' element={<Navigate replace to={'/'}/>} />
            <Route path="/" element={<HomePage/>} />
            <Route path='/variables/' element={<VariableList/>} />
            <Route path='/variables/:id' element={<VariableDescription/>} />
          </Routes>
        </BrowserRouter>
      </VariablesContextProvider>
    </GlobalContextProvider>
  );
}

export default App;
