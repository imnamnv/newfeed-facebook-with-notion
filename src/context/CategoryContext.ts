import React from "react";
import createDataContext, { ActionType } from "./createDataContext";
import { DateList } from "../models";
import { setInitState } from "../utils/storage";

const ROOT_ACTION = {
  SET_CURRENT_CATEGORY: "set_current_category",
  SET_CURRENT_STATUS: "set_current_status",
  ADD_NEW_CATEGORY: "add_new_category",
  UPDATE_CATEGORY: "update_category",
  DELETE_CATEGORY: "delete_category",
  SET_INIT_STATE: "set_init_state",
};

export const enum ROOT_STATUS {
  LEARNING,
  ADDING,
  EDITING,
  IMPORTING,
}

export interface InitState {
  state: {
    currentCategory: string;
    dateList: DateList[];
    currentStatus: ROOT_STATUS;
    loading: boolean;
  };
  [key: string]: any;
}

export interface InitStateAction {
  setCurrentCategory: (payload: { id: string }) => void;
  setCurrentStatus: (payload: { currentStatus: ROOT_STATUS }) => void;
  addNewCategory: (payload: { newCategory: DateList }) => void;
  updateCategory: (payload: { category: DateList }) => void;
  deleteCategory: (payload: { id: string }) => void;
  setState: (payload: { initState: InitState }) => void;
}

const categoryReducer = (
  state: {
    currentCategory: string;
    dateList: DateList[];
    currentStatus: ROOT_STATUS;
    loading: boolean;
  },
  action: ActionType
) => {
  switch (action.type) {
    case ROOT_ACTION.SET_CURRENT_CATEGORY: {
      const newState = {
        ...state,
        currentCategory: action.payload,
      };

      setInitState({ state: newState });
      return newState;
    }
    case ROOT_ACTION.SET_CURRENT_STATUS: {
      const newState = {
        ...state,
        currentStatus: action.payload,
      };

      setInitState({ state: newState });
      return newState;
    }

    case ROOT_ACTION.ADD_NEW_CATEGORY: {
      const newState = {
        ...state,
        categoryList: [...state.dateList, action.payload],
        currentCategory: action.payload.id,
      };

      setInitState({ state: newState });
      return newState;
    }

    case ROOT_ACTION.SET_INIT_STATE: {
      return action.payload.state;
    }

    default:
      return state;
  }
};

const setCurrentCategory = (dispatch: React.Dispatch<ActionType>) => {
  return ({ id }: { id: string | number }) => {
    dispatch({
      type: ROOT_ACTION.SET_CURRENT_CATEGORY,
      payload: id,
    });
  };
};

const setCurrentStatus = (dispatch: React.Dispatch<ActionType>) => {
  return ({ currentStatus }: { currentStatus: ROOT_STATUS }) => {
    dispatch({
      type: ROOT_ACTION.SET_CURRENT_STATUS,
      payload: currentStatus,
    });
  };
};

const addNewCategory = (dispatch: React.Dispatch<ActionType>) => {
  return ({ newCategory }: { newCategory: DateList }) => {
    dispatch({
      type: ROOT_ACTION.ADD_NEW_CATEGORY,
      payload: newCategory,
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
    setCurrentCategory,
    setCurrentStatus,
    addNewCategory,

    setState,
  },
  {
    currentCategory: "0",
    dateList: {},
    currentStatus: ROOT_STATUS.LEARNING,
    loading: false,
  }
);
