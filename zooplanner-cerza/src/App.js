import { BrowserRouter,Routes,Route } from "react-router-dom";
import Connexion from "./pages/Connexion";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Connexion/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
