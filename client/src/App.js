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
import Homepage from './components/Homepage';
import SideNavbar from './components/SideNavbar';

function App() {
  return (
    render(
      <BrowserRouter>
      <Navbar />
      <SideNavbar />
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/stock/:stockTicker" element={<Stock />}></Route>
      </Routes>
      </BrowserRouter>,
      document.getElementById("root")
    )
  );
}

export default App;
