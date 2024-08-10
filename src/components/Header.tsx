import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  Button as ButtonMUI,
} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";

import {
  Context as CategoryContext,
  InitState,
  InitStateAction,
} from "../context/CategoryContext";
import { setInitState } from "../utils/storage";
import axios from "axios";

var randomProperty = function (obj) {
  var keys = Object.keys(obj);
  return keys[(keys.length * Math.random()) << 0];
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1),

    "&.MuiInputLabel-outlined": {
      color: "black",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "70%",
  },
  select: {
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "black",
    },
  },
  button: {
    marginLeft: 8,
    marginRight: 8,
  },
}));

export default () => {
  const { state, setCurrentCategory, setState } = useContext<
    InitState & InitStateAction
  >(CategoryContext);

  const classes = useStyles();

  useEffect(() => {
    if (state.dateList && Object.keys(state.dateList).length > 0) {
      setCurrentCategory({ id: randomProperty(state.dateList) });
    }
  }, [state.dateList]);

  const handleCaregoryChange = (
    event: React.ChangeEvent<{ name?: string; value: string }>
  ) => {
    setCurrentCategory({ id: event.target.value });
  };

  return (
    <Box className={classes.root}>
      {state.loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {" "}
          <FormControl
            size="small"
            variant="outlined"
            className={classes.formControl}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              width: "100%",
            }}
          >
            <InputLabel htmlFor="outlined-category-native-simple">
              Category
            </InputLabel>
            <Select
              className={classes.select}
              native
              value={state.currentCategory}
              onChange={handleCaregoryChange}
              label="Category"
              inputProps={{
                name: "category",
                id: "outlined-category-native-simple",
              }}
              style={{ flexGrow: 1 }}
            >
              {Object.keys(state.dateList).map((category, index) => {
                return (
                  <option key={index} value={category}>
                    {category}
                  </option>
                );
              })}
            </Select>

            <ButtonMUI
              className={classes.button}
              style={{
                height: 40,
              }}
              variant="contained"
              size="small"
              color="primary"
              onClick={async () => {
                try {
                  const response = await axios.get(
                    "https://notion-server-1.onrender.com/"
                  );

                  setInitState({
                    state: { ...state, dateList: response.data },
                  });

                  setState({
                    initState: { state: { ...state, dateList: response.data } },
                  });
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              Re-fetch data
            </ButtonMUI>
          </FormControl>
        </>
      )}
    </Box>
  );
};
