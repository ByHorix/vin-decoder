import React from 'react';
import { GlobalContextProvider } from './store/GlobalContext';
import { HomePage } from './components/HomePage/HomePage';
import { Routes, Route, Navigate, HashRouter } from 'react-router-dom';
import { VariableList } from './components/VariablesList/VariablesList';
import { VariablesContextProvider } from './store/VariablesContext';
import { VariableDescription } from './components/VariableDescription/VariableDescription';
import './index.scss';

const App: React.FC = () => {
  return (
    <GlobalContextProvider>
      <VariablesContextProvider>
        <HashRouter>
          <Routes>
            <Route path='*' element={<Navigate replace to={'/'}/>} />
            <Route path="/" element={<HomePage/>} />
            <Route path='/variables/' element={<VariableList/>} />
            <Route path='/variables/:id' element={<VariableDescription/>} />
          </Routes>
        </HashRouter>
      </VariablesContextProvider>
    </GlobalContextProvider>
  );
}

export default App;
