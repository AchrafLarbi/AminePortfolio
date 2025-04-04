import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReactGA from "react-ga4";

import LandingPage from "./pages/LandingPage";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </div>
    </Router>
  );
};

// Separate PageTracking Component

export default App;
