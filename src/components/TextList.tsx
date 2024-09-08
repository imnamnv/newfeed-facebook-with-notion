import React, { useContext, useEffect } from "react";
import { Context as CategoryContext } from "../context/CategoryContext";
import { Typography } from "@material-ui/core";
import { getText } from "../utils/api";

export default () => {
  const { state } = useContext<any>(CategoryContext);
  const [contents, setContents] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        if (state.currentToggle) {
          const response = await getText(state.currentToggle);
          setContents(response);
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    })();
  }, [state.currentToggle]);

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <div style={{ width: "100%" }}>
      {contents?.map((item, index) => (
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
