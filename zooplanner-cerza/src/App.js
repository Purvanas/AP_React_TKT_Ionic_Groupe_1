import { BrowserRouter,Routes,Route } from "react-router-dom";
import Accueil from "./pages/Accueil";
import MissionsUsers from "./pages/MissionsUsers";
import Register from "./pages/Register";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil/>}></Route>
        <Route path="/Missions" element={<MissionsUsers />}></Route>
        <Route path="/register" element={<Register/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
