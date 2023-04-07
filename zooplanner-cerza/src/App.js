import { BrowserRouter,Routes,Route } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Connexion from "./pages/Connexion";
import MissionAdmin from "./pages/MissionAdmin";
import MissionsUsers from "./pages/MissionsUsers";
import Register from "./pages/Register";
import AlerteAdmin from "./pages/AlerteAdmin";

import EncyclopedieSearch from "./pages/EncyclopedieSearch";
import FicheEspece from "./pages/FicheEspece";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Connexion/>}></Route>
        <Route path="/Accueil" element={<Accueil/>}></Route>
        <Route path="/Missions" element={<MissionsUsers />}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/MissionAdmin" element={<MissionAdmin/>}></Route>
        <Route path="/AlertesAdmin" element={<AlerteAdmin/>}></Route>
        <Route path="/RechercheEncyclopedie" element={<EncyclopedieSearch/>}></Route>
        <Route path="/FicheEncyclopedie/:idEspece" element={<FicheEspece/>}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
