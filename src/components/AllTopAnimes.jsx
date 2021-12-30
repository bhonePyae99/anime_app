import useGetAnimes from "../hooks/useGetAnimes";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Loading from "../context/LoadingContext";
import Loader from "./commons/Loader";
import { useContext } from "react";

const AllTopAnimes = () => {
  const animes = useGetAnimes("https://api.jikan.moe/v3/top/anime");
  const navigate = useNavigate();
  const LoadingContext = useContext(Loading);

  return (
    <div className="container-lg">
      <div className="text-center">
        <h3 className="mt-5">Top Animes of All Times</h3>
      </div>
      <div className="container-lg">
        {LoadingContext.loading ? (
          <Loader />
        ) : (
          <div className="row justify-content-center">
            {animes.map((item) => (
              <motion.div
                key={item.mal_id}
                whileHover={{ scale: 1.1 }}
                onClick={() => {
                  navigate(`/anime/${item.mal_id}`);
                }}
                className="anime-display"
                style={{
                  backgroundImage: `url(${item.image_url})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  cursor: "pointer",
                }}
              >
                <p className="text-light">{item.title}</p>
                <span className="badge bg-info text-dark score">
                  <i className="bi bi-star-fill"></i> {item.score}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTopAnimes;
