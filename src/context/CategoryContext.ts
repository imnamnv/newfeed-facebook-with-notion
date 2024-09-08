import React from "react";
import createDataContext, { ActionType } from "./createDataContext";
import { DateList } from "../models";
import { TogglesList } from "../models/TogglesList";

const ROOT_ACTION = {
  SET_CURRENT_CATEGORY: "set_current_category",
  SET_INIT_STATE: "set_init_state",
};

export interface InitState {
  state: {
    currentToggle: string;
    dateList: DateList[];
    togglesList: TogglesList;
    loading: boolean;
  };
  [key: string]: any;
}

export interface InitStateAction {
  setCurrentToggle: (payload: { id: string }) => void;
  setState: (payload: { initState: InitState }) => void;
}

const categoryReducer = (
  state: {
    currentToggle: string;
    dateList: DateList[];
    togglesList: TogglesList;
    loading: boolean;
  },
  action: ActionType
) => {
  switch (action.type) {
    case ROOT_ACTION.SET_CURRENT_CATEGORY: {
      const newState = {
        ...state,
        currentToggle: action.payload,
      };

      return newState;
    }

    case ROOT_ACTION.SET_INIT_STATE: {
      return action.payload.state;
    }

    default:
      return state;
  }
};

const setCurrentToggle = (dispatch: React.Dispatch<ActionType>) => {
  return ({ id }: { id: string | number }) => {
    dispatch({
      type: ROOT_ACTION.SET_CURRENT_CATEGORY,
      payload: id,
    });
  };
};

const setState = (dispatch: React.Dispatch<ActionType>) => {
  return ({ initState }: { initState: InitState }) => {
    dispatch({
      type: ROOT_ACTION.SET_INIT_STATE,
      payload: initState,
    });
  };
};

export const { Provider, Context } = createDataContext(
  categoryReducer,
  {
    setCurrentToggle,
    setState,
  },
  {
    currentToggle: null,
    dateList: {},
    loading: false,
  }
);
