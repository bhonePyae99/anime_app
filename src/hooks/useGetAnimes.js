import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Loading from "../context/LoadingContext";

const useGetAnimes = (url) => {
  const [animes, setAnimes] = useState([]);
  const LoadingContext = useContext(Loading);
  useEffect(() => {
    const getTopAnimes = async () => {
      LoadingContext.setLoading(true);
      const resp = await axios.get(url);
      setAnimes(resp.data.top);
      LoadingContext.setLoading(false);
    };
    getTopAnimes();
  }, [url]);

  return animes;
};

export default useGetAnimes;
