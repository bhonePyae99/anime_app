import { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import Loading from "../context/LoadingContext";

const useGetAnimes = (url) => {
  const [animes, setAnimes] = useState([]);
  const LoadingContext = useRef(useContext(Loading));

  useEffect(() => {
    const getTopAnimes = async () => {
      LoadingContext.current.setLoading(true);
      const resp = await axios.get(url);
      setAnimes(resp.data.top);
      LoadingContext.current.setLoading(false);
    };
    getTopAnimes();
  }, [url]);

  return animes;
};

export default useGetAnimes;
