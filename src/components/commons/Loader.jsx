import { css } from "@emotion/react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import Loading from "../../context/LoadingContext";
import { useContext } from "react";

const Loader = () => {
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
    <ClimbingBoxLoader
      color={"lime"}
      loading={LoadingContext.loading}
      size={16}
      css={override}
    />
  );
};

export default Loader;
