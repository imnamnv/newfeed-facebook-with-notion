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
import Header from "./Header";
import { getText } from "../utils/api";

export default ({ feed }: { feed: HTMLElement }) => {
  const { state, setState } = useContext<InitState & InitStateAction>(
    CategoryContext
  );

  useEffect(() => {
    (async () => {
      try {
        setState({ initState: { state: { ...state, loading: true } } });

        // If there is no data in the local storage, fetch the data from the server
        let data = await getInitState();

        if (Object.keys(data).length === 0) {
          const response: any = await getText(
            "75bd4c5f881e4910a08c4563938bc15c"
          );
          setInitState({
            state: { ...state, dateList: response },
          });

          data = {
            state: { ...state, dateList: response },
          };
        }

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
