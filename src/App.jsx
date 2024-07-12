import React from 'react';
import './App.css';
import { Link } from "react-router-dom";
import CustomRoutes from "./CustomRoutes";

function App() {
  return (
    <div className = "outer-pokedex">
      <h1> 
        <Link className = "Pokedex-Heading" to = "/"> My Pokedex Project With Vite React </Link> 
      </h1>
      <CustomRoutes />
      gyuguiuiouiou
    </div>
    
  );
}

export default App;