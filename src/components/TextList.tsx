import React, { useContext, useMemo } from "react";
import { Context as CategoryContext } from "../context/CategoryContext";
import { Typography } from "@material-ui/core";

export default () => {
  const { state } = useContext<any>(CategoryContext);

  const text = useMemo(() => {
    return state.dateList[state.currentCategory] || [];
  }, [state.dateList, state.currentCategory]);

  return (
    <div style={{ width: "100%" }}>
      {text?.map((item, index) => (
        <div key={index}>
          {item.type === "image" && (
            <img style={{ width: "100%" }} src={item.text} />
          )}

          {item.type === "paragraph" && (
            <Typography variant="h6">{item.text}</Typography>
          )}
        </div>
      ))}
    </div>
  );
};
