import React, { useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  Context as CategoryContext,
  InitState,
  InitStateAction,
} from "../context/CategoryContext";
import TextList from "./TextList";
import Header from "./Header";
import { getAllToggles } from "../utils/api";
import { getInitState } from "../utils/storage";

export default ({ feed }: { feed: HTMLElement }) => {
  const { state, setState } = useContext<InitState & InitStateAction>(
    CategoryContext
  );

  useEffect(() => {
    (async () => {
      try {
        const { state } = await getInitState();
        setState({ initState: { state: { ...state, loading: true } } });

        const togglesList = await getAllToggles(state.pageId);

        setState({
          initState: { state: { ...state, togglesList, loading: false } },
        });
      } catch (error) {
        console.log(error);
        setState({ initState: { state: { ...state, loading: false } } });
      }
    })();
  }, []);

  return ReactDOM.createPortal(
    <div id="nfe-container">
      <Header />
      <TextList />
    </div>,
    feed
  );
};
