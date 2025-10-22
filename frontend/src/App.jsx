import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ScreenMain from "./pages/ScreenMain";
import Prontuario from "./pages/Prontuario";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/prontuario" element={<Prontuario />} />
      </Routes>
    </Router>
  );
}

export default App;