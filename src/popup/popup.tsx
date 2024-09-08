import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./popup.css";
import {
  FormControl,
  InputLabel,
  Button as ButtonMUI,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getInitState, setInitState } from "../utils/storage";

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: 120,
    width: "100%",
  },
}));

const App: React.FC<{}> = () => {
  const classes = useStyles();
  const [apiUrl, setApiUrl] = React.useState<string>("");
  const [pageId, setPageId] = React.useState<string>("");
  const [isSaved, setIsSaved] = React.useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const res = await getInitState();
      if (res.state) {
        setApiUrl(res.state.apiUrl);
        setPageId(res.state.pageId);
      }
    })();
  }, []);

  return (
    <div>
      <FormControl
        size="small"
        variant="outlined"
        className={classes.formControl}
        style={{
          width: "100%",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Api url"
          variant="outlined"
          value={apiUrl}
          onChange={(e) => setApiUrl(e.target.value)}
          style={{ marginBottom: "1rem" }}
        />
        <TextField
          id="outlined-basic"
          label="Page id"
          variant="outlined"
          value={pageId}
          onChange={(e) => setPageId(e.target.value)}
        />

        {isSaved && (
          <Typography
            variant="body2"
            style={{ marginTop: "1rem", color: "green" }}
          >
            Done
          </Typography>
        )}

        <ButtonMUI
          style={{
            height: 40,
            width: "100%",
            marginTop: "1rem",
          }}
          variant="contained"
          size="small"
          color="primary"
          onClick={async () => {
            setInitState({
              state: {
                apiUrl,
                pageId,
              },
            });

            setIsSaved(true);
          }}
          type="submit"
        >
          Save data
        </ButtonMUI>
      </FormControl>
    </div>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);

ReactDOM.render(<App />, root);
