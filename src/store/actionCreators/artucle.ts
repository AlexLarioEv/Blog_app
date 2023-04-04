// eslint-disable-next-line import/named
import { Dispatch } from "redux";

import {
  TArticleAction,
  EArticleActionTypes,
} from "../../types/article";

export const fetchArticle = (
  count: number,
  offset: number = 0,
  token?: string
) => {
  return async (dispatch: Dispatch<TArticleAction>) => {
    dispatch({ type: EArticleActionTypes.FETCH_ARTICLE });
    const res = await fetch(
      `https://blog.kata.academy/api/articles?limit=${count}&offset=${offset}`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    if (res.ok) {
      const data = await res.json();
      dispatch({
        type: EArticleActionTypes.FETCH_ARTICLE_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: EArticleActionTypes.FETCH_ARTICLE_ERROR,
        payload: "Ошибка при получения данных с сервера",
      });
    }
  };
};

export const fetchArticleFull = (slug: string, token?: string) => {
  return async (dispatch: Dispatch<TArticleAction>) => {
    dispatch({ type: EArticleActionTypes.FETCH_ARTICLE });
    const res = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    if (res.ok) {
      const data = await res.json();
      dispatch({
        type: EArticleActionTypes.FETCH_ARTICLE_FULL_SUCCESS,
        payload: data.article,
      });
    } else {
      dispatch({
        type: EArticleActionTypes.FETCH_ARTICLE_ERROR,
        payload: "Ошибка при получения данных с сервера",
      });
    }
  };
};

export const fetchNewArticle = (data: {}, token: string) => {
  return async (dispatch: Dispatch<TArticleAction>) => {
    dispatch({ type: EArticleActionTypes.FETCH_ARTICLE });
    const res = await fetch("https://blog.kata.academy/api/articles", {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const data = await res.json();
      dispatch({
        type: EArticleActionTypes.FETCH_ARTICLE_FULL_SUCCESS,
        payload: data.article,
      });
    } else {
      const errors = await res.json();
      dispatch({
        type: EArticleActionTypes.FETCH_ARTICLE_ERROR,
        payload: errors.errors,
      });
    }
  };
};

export const fetchEditArticle = (data: {}, token: string, slug: string) => {
  return async (dispatch: Dispatch<TArticleAction>) => {
    dispatch({ type: EArticleActionTypes.FETCH_ARTICLE });
    const res = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: "PUT",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const data = await res.json();
      dispatch({
        type: EArticleActionTypes.FETCH_ARTICLE_FULL_SUCCESS,
        payload: data.article,
      });
    } else {
      const errors = await res.json();
      dispatch({
        type: EArticleActionTypes.FETCH_ARTICLE_ERROR,
        payload: errors.errors,
      });
    }
  };
};

export const fetchDeleteArticle = (token: string, slug: string) => {
  return async (dispatch: Dispatch<TArticleAction>) => {
    dispatch({ type: EArticleActionTypes.FETCH_ARTICLE });
    const res = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: "Delete",
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    if (res.ok) {
      dispatch({
        type: EArticleActionTypes.FETCH_ARTICLE_DELETE,
      });
    } else {
      const errors = await res.json();
      dispatch({
        type: EArticleActionTypes.FETCH_ARTICLE_ERROR,
        payload: errors.errors,
      });
    }
  };
};

export const fetchFavoritesArticle = (
  token: string,
  slug: string,
  favorited: boolean
) => {
  return async (dispatch: Dispatch<TArticleAction>) => {
    dispatch({ type: EArticleActionTypes.FETCH_ARTICLE });
    const res = await fetch(
      `https://blog.kata.academy/api/articles/${slug}/favorite`,
      {
        method: favorited ? "DELETE" : "POST",
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    if (res.ok) {
      const data = await res.json();
      dispatch({
        type: EArticleActionTypes.FETCH_ARTICLE_FULL_SUCCESS,
        payload: data.article,
      });
    } else {
      const errors = await res.json();
      dispatch({
        type: EArticleActionTypes.FETCH_ARTICLE_ERROR,
        payload: errors.errors,
      });
    }
  };
};
