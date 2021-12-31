import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import Loading from "../context/LoadingContext";
import WatchListContext from "../context/WatchListContext";
import axios from "axios";
import { css } from "@emotion/react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

const Anime = () => {
  const para = useParams();
  const [anime, setAnime] = useState({});
  const url = `https://api.jikan.moe/v3/anime/${para.id}`;
  const LoadingContext = useContext(Loading);
  const MyWatchListContext = useContext(WatchListContext);
  const watchList = [...MyWatchListContext.watchList];
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

  const alreadyAdded = (anime) => {
    let found = false;
    for (let i = 0; i < watchList.length; i++) {
      if (watchList[i].mal_id === anime.mal_id) {
        found = true;
        break;
      }
    }
    return found;
  };

  const addToWatchList = (item) => {
    const anime = {
      mal_id: item.mal_id,
      image_url: item.image_url,
      title: item.title,
    };
    if (alreadyAdded(anime)) {
      const newWatchList = watchList.filter((i) => i.mal_id !== anime.mal_id);
      MyWatchListContext.setWatchList(newWatchList);
    } else {
      watchList.push(anime);
      MyWatchListContext.setWatchList(watchList);
    }
  };

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
        <div className="row justify-content-center g-3">
          <div className="col-md-3 text-center justify-content-center">
            <h4 className="text-muted">{anime.title}</h4>
            <img src={anime.image_url} className="img-fluid" alt="" />
            <div className="btn-group mt-2">
              <button className="btn btn-success btn-sm">
                Add To Favorites
              </button>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  addToWatchList(anime);
                }}
              >
                {alreadyAdded(anime) ? (
                  <span>Remove From WatchList</span>
                ) : (
                  <span>Add To WatchList</span>
                )}
              </button>
            </div>
          </div>
          <div className="col-lg-6 bg-light">
            <h4>Episodes: {anime.episodes}</h4>
            <div className="row">
              <div className="col-3 border-end border-dark align-items-center">
                <span class="badge bg-info text-dark">
                  <i className="bi bi-star-fill"></i> {anime.score}
                </span>
              </div>
              <div className="col-3 border-end border-dark text-center align-items-center">
                {anime.premiered}
              </div>
              <div className="col-3 border-end border-dark text-center align-items-center">
                {anime.type}
              </div>
              <div className="col-3 text-center">
                {anime.airing === false ? anime.aired.string : "Airing"}
              </div>
            </div>
            <h3 className="mt-4">Synopsis</h3>
            <p className="text-muted">{anime.synopsis}</p>
            <a
              href={anime.trailer_url}
              className="btn btn-primary mt-2 float-end"
            >
              Watch Trailer
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Anime;
