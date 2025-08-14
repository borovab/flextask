import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router";
import InventoryPage from "./components/InventoryPage/InventoryPage";
import Home from './pages/Home/Home';

function App() {
  return (
      <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/inventory/:jobsiteId" element={<InventoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
