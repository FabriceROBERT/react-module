import "./App.css";
import Homepage from "./pages/Homepage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Card from "./components/Card";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/card/:id" element={<Card />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
