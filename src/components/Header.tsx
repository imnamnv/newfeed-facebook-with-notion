import React, { useContext, useEffect } from "react";
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

var randomProperty = function (obj) {
  return obj[(obj.length * Math.random()) << 0].id;
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
  const {
    state: { togglesList, loading, currentToggle },
    setCurrentToggle,
  } = useContext<InitState & InitStateAction>(CategoryContext);

  const classes = useStyles();

  useEffect(() => {
    if (togglesList && togglesList.length > 0) {
      setCurrentToggle({ id: randomProperty(togglesList) });
    }
  }, [togglesList]);

  const handleCaregoryChange = (
    event: React.ChangeEvent<{ name?: string; value: string }>
  ) => {
    setCurrentToggle({ id: event.target.value });
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box className={classes.root}>
      <>
        {currentToggle && (
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
              value={currentToggle}
              onChange={handleCaregoryChange}
              label="Category"
              inputProps={{
                name: "category",
                id: "outlined-category-native-simple",
              }}
              style={{ flexGrow: 1 }}
            >
              {togglesList?.map((toggle, index) => {
                return (
                  <option key={index} value={toggle.id}>
                    {toggle.text}
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
                setCurrentToggle({ id: randomProperty(togglesList) });
              }}
            >
              Random data
            </ButtonMUI>
          </FormControl>
        )}
      </>
    </Box>
  );
};
