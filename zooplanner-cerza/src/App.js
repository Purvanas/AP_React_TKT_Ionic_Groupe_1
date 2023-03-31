import { BrowserRouter,Routes,Route } from "react-router-dom";
import Connexion from "./pages/Connexion";
import Accueil from "./pages/Accueil";
import Register from "./pages/Register";
import { useState } from "react";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Connexion/>}></Route>
        <Route path="/accueil" element={<Accueil/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
