import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StartPage } from './pages/StartPage/StartPage';
import { MainPage } from './pages/MainPage/MainPage';
import { Context } from './context';

export const App = () => {
  const [form, setForm] = useState({
    numberRow: '3',
    numberCol: '3'
  })
    return (
      <Context.Provider value={{form, setForm}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<StartPage/>} />
            <Route path="/main" exact element={<MainPage/>} />
          </Routes>
      </BrowserRouter>
      </Context.Provider>
    );
}

export default App;