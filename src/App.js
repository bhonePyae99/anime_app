import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import TopAnimes from "./components/TopAnimes";
import Anime from "./components/Anime";
import AllTopAnimes from "./components/AllTopAnimes";
import Loading from "./context/LoadingContext";
import WatchListContext from "./context/WatchListContext";
import WatchList from "./components/WatchList";

function App() {
  const [loading, setLoading] = useState(false);
  const [watchList, setWatchList] = useState([]);

  useEffect(() => {
    setWatchList(JSON.parse(localStorage.getItem("watchList")) || []);
  }, []);

  useEffect(() => {
    localStorage.setItem("watchList", JSON.stringify(watchList));
  }, [watchList]);

  return (
    <WatchListContext.Provider value={{ watchList, setWatchList }}>
      <Loading.Provider value={{ loading, setLoading }}>
        <div className="App">
          <NavBar />
          <Routes>
            <Route path="/" element={<TopAnimes />} />
            <Route path="/topanimes" element={<AllTopAnimes />} />
            <Route path="/anime/:id" element={<Anime />} />
            <Route path="/watchlists" element={<WatchList />} />
          </Routes>
        </div>
      </Loading.Provider>
    </WatchListContext.Provider>
  );
}

export default App;
