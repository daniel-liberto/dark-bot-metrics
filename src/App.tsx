
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Bots from "./pages/Bots";
import History from "./pages/History";
import Wallet from "./pages/Wallet";
import CreditPlans from "./pages/CreditPlans";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Bots />} />
        <Route path="/bots" element={<Bots />} />
        <Route path="/history" element={<History />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/credit-plans" element={<CreditPlans />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
