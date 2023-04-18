import { BrowserRouter,Routes,Route } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Connexion from "./pages/Connexion";
import MissionAdmin from "./pages/MissionAdmin";
import Register from "./pages/Register";
import AlerteAdmin from "./pages/AlerteAdmin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Connexion/>}></Route>
        <Route path="/Accueil" element={<Accueil/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/MissionAdmin" element={<MissionAdmin/>}></Route>
        <Route path="/AlertesAdmin" element={<AlerteAdmin/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
