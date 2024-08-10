import React, { useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  Context as CategoryContext,
  InitState,
  InitStateAction,
  ROOT_STATUS,
} from "../context/CategoryContext";
import { getInitState, setInitState } from "../utils/storage";
import TextList from "./TextList";
import axios from "axios";
import Header from "./Header";

export default ({ feed }: { feed: HTMLElement }) => {
  const { state, setState } = useContext<InitState & InitStateAction>(
    CategoryContext
  );

  useEffect(() => {
    (async () => {
      try {
        setState({ initState: { state: { ...state, loading: true } } });
        const response = await axios.get(
          "https://notion-server-1.onrender.com/"
        );
        setInitState({
          state: { ...state, dateList: response.data },
        });

        const data = await getInitState();

        if (Object.keys(data).length !== 0) {
          setState({ initState: { ...data, loading: false } });
        }
      } catch (error) {
        console.log(error);
        setState({ initState: { state: { ...state, loading: false } } });
      }
    })();
  }, []);

  return ReactDOM.createPortal(
    <div id="nfe-container">
      <Header />
      {state?.currentStatus === ROOT_STATUS.LEARNING && <TextList />}
    </div>,
    feed
  );
};
