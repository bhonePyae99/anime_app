import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import NavBar from "./components/NavBar";
import TopAnimes from "./components/TopAnimes";
import Anime from "./components/Anime";
import AllTopAnimes from "./components/AllTopAnimes";
import Loading from "./context/LoadingContext";

function App() {
  const [loading, setLoading] = useState(false);
  return (
    <Loading.Provider value={{ loading, setLoading }}>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<TopAnimes />} />
          <Route path="/topanimes" element={<AllTopAnimes />} />
          <Route path="/anime/:id" element={<Anime />} />
        </Routes>
      </div>
    </Loading.Provider>
  );
}

export default App;
