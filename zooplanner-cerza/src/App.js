import { BrowserRouter,Routes,Route } from "react-router-dom";
import Accueil from "./pages/Accueil";
import MissionsUsers from "./pages/MissionsUsers";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil/>}></Route>
        <Route path="/Missions" element={<MissionsUsers />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
