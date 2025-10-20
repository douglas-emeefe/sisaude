import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Prontuario from "./pages/Prontuario";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Prontuario />} />
      </Routes>
    </Router>
  );
}

export default App;

