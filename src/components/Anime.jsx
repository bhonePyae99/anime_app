import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import Loading from "../context/LoadingContext";
import axios from "axios";
import { css } from "@emotion/react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

const Anime = () => {
  const para = useParams();
  const [anime, setAnime] = useState({});
  const url = `https://api.jikan.moe/v3/anime/${para.id}`;
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

  useEffect(() => {
    const getAnime = async () => {
      const resp = await axios.get(url);
      setAnime(resp.data);
    };
    getAnime();
  }, [url]);
  return (
    <div className="container-lg mt-5">
      {LoadingContext.loading ? (
        <ClimbingBoxLoader
          color={"lime"}
          loading={LoadingContext.loading}
          size={16}
          css={override}
        />
      ) : (
        <div className="row justify-content-center">
          <div className="col-lg-3 bg-light text-center">
            <img src={anime.image_url} className="img-fluid" alt="" />
          </div>
          <div className="col-lg-6 bg-light">
            <h3>{anime.title}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Anime;
