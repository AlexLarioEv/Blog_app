import { Dispatch } from "redux";

import {
  TAuthenticationAction,
  EAuthenticationActionTypes,
} from "../../types/authentication";

export const fetchRegister = (data: {}) => {
  return async (dispatch: Dispatch<TAuthenticationAction>) => {
    dispatch({ type: EAuthenticationActionTypes.FETCH_AUTHENTICATION });
    const res = await fetch("https://blog.kata.academy/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const user = await res.json();
      localStorage.setItem("token", user.user.token);
      dispatch({
        type: EAuthenticationActionTypes.FETCH_AUTHENTICATION_REGISTER,
        payload: user.user,
      });
    } else {
      const errors = await res.json();
      dispatch({
        type: EAuthenticationActionTypes.FETCH_AUTHENTICATION_ERROR,
        payload: errors.errors,
      });
    }
  };
};

export const fetchLogin = (data: {}) => {
  return async (dispatch: Dispatch<TAuthenticationAction>) => {
    dispatch({ type: EAuthenticationActionTypes.FETCH_AUTHENTICATION });
    const res = await fetch("https://blog.kata.academy/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const user = await res.json();
      localStorage.setItem("token", user.user.token);
      dispatch({
        type: EAuthenticationActionTypes.FETCH_AUTHENTICATION_LOGIN,
        payload: user.user,
      });
    } else {
      const errors = await res.json();
      dispatch({
        type: EAuthenticationActionTypes.FETCH_AUTHENTICATION_ERROR,
        payload: errors.errors,
      });
    }
  };
};

export const fetchUpdate = (data: {}, token: string) => {
  return async (dispatch: Dispatch<TAuthenticationAction>) => {
    dispatch({ type: EAuthenticationActionTypes.FETCH_AUTHENTICATION });
    const res = await fetch("https://blog.kata.academy/api/user", {
      method: "PUT",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const user = await res.json();
      dispatch({
        type: EAuthenticationActionTypes.FETCH_AUTHENTICATION_UPDATE,
        payload: user.user,
      });
    } else {
      const errors = await res.json();
      dispatch({
        type: EAuthenticationActionTypes.FETCH_AUTHENTICATION_ERROR,
        payload: errors.errors,
      });
    }
  };
};

export const fetchGetUser = (token: string | null) => {
  return async (dispatch: Dispatch<TAuthenticationAction>) => {
    dispatch({ type: EAuthenticationActionTypes.FETCH_AUTHENTICATION });
    const res = await fetch("https://blog.kata.academy/api/user", {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    if (res.ok) {
      const user = await res.json();
      dispatch({
        type: EAuthenticationActionTypes.FETCH_AUTHENTICATION_GET_USER,
        payload: user.user,
      });
    } else {
      const errors = await res.json();
      dispatch({
        type: EAuthenticationActionTypes.FETCH_AUTHENTICATION_ERROR,
        payload: errors.errors,
      });
    }
  };
};
