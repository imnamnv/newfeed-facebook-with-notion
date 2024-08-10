import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Container from "../components/Container";
import { Provider } from "../context/CategoryContext";
import "./contentScript.css";

function isAlreadyInjected() {
  return document.querySelector("#nfe-container") !== null;
}

let feed = document.querySelector<HTMLElement>("div.x1hc1fzr.x1unhpq9.x6o7n8i");

const App = () => {
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAlreadyInjected()) {
        feed = document.querySelector<HTMLElement>(
          "div.x1hc1fzr.x1unhpq9.x6o7n8i"
        );
        setRerender((old) => {
          return !old;
        });
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div id="namnv">
      <Provider>
        {feed !== null && <Container feed={feed.parentElement} />}
      </Provider>
    </div>
  );
};

const root = document.createElement("div");

ReactDOM.render(<App />, root);
