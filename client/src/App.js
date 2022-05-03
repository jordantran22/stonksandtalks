import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Stock from './components/Stock';
import Navbar from './components/Navbar';

function App() {
  return (
    render(
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/stock/:stockTicker" element={<Stock />}></Route>
      </Routes>
      </BrowserRouter>,
      document.getElementById("root")
    )
  );
}

export default App;
