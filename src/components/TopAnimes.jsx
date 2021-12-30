import useGetAnimes from "./../hooks/useGetAnimes";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Loading from "./../context/LoadingContext";
import { useContext } from "react";
import { css } from "@emotion/react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1200 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 700 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const TopAnimes = () => {
  const topAnimes = useGetAnimes("https://api.jikan.moe/v3/top/anime");
  const navigate = useNavigate();
  const LoadingContext = useContext(Loading);
  const override = css`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
  `;
  return (
    <div className="container-lg mt-3 justify-content-center">
      <div className="title">
        <h3 className="fw-bold">Top Animes of All Times</h3>
        <Link to="/topanimes">
          <button className="btn btn-primary">See All</button>
        </Link>
      </div>
      {LoadingContext.loading ? (
        <ClimbingBoxLoader
          color={"lime"}
          loading={LoadingContext.loading}
          size={16}
          css={override}
        />
      ) : (
        <Carousel responsive={responsive} centerMode={true}>
          {topAnimes.map((item) => (
            <motion.div
              key={item.mal_id}
              whileHover={{ scale: 1.1 }}
              className="anime-display"
              onClick={() => {
                navigate(`/anime/${item.mal_id}`);
              }}
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
        </Carousel>
      )}
      ;
    </div>
  );
};

export default TopAnimes;
