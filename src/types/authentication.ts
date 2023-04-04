export interface IUser {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
}

export interface IError {
  email: string;
  username: string;
  "email or password": string;
  message: string;
  error: {
    name: string;
    message: string;
    code: string;
    status: 401;
  };
}

export interface IAuthenticationState {
  user: IUser;
  login: boolean;
  loading: boolean;
  error: IError | null;
}

export enum EAuthenticationActionTypes {
  FETCH_AUTHENTICATION = "FETCH_AUTHENTICATION",
  FETCH_AUTHENTICATION_REGISTER = "FETCH_AUTHENTICATION_REGISTER",
  FETCH_AUTHENTICATION_LOGIN = "FETCH_AUTHENTICATION_LOGIN",
  FETCH_AUTHENTICATION_GET_USER = "FETCH_AUTHENTICATION_GET_USER",
  FETCH_AUTHENTICATION_UPDATE = "FETCH_AUTHENTICATION_UPDATE",
  FETCH_AUTHENTICATION_ERROR = "FETCH_AUTHENTICATION_ERROR",
  FETCH_AUTHENTICATION_EXIET = "FETCH_AUTHENTICATION_EXIET",
}

interface IFetchAuthenticationAction {
  type: EAuthenticationActionTypes.FETCH_AUTHENTICATION;
}

interface IAuthenticationActionRegister {
  type: EAuthenticationActionTypes.FETCH_AUTHENTICATION_REGISTER;
  payload: IUser;
}

interface IAuthenticationActionLogin {
  type: EAuthenticationActionTypes.FETCH_AUTHENTICATION_LOGIN;
  payload: IUser;
}

interface IAuthenticationGetUser {
  type: EAuthenticationActionTypes.FETCH_AUTHENTICATION_GET_USER;
  payload: IUser;
}

interface IAuthenticationUpdate {
  type: EAuthenticationActionTypes.FETCH_AUTHENTICATION_UPDATE;
  payload: IUser;
}

interface IAuthenticationError {
  type: EAuthenticationActionTypes.FETCH_AUTHENTICATION_ERROR;
  payload: IError;
}

interface IAuthenticationActionExiet {
  type: EAuthenticationActionTypes.FETCH_AUTHENTICATION_EXIET;
}

export type TAuthenticationAction =
  | IFetchAuthenticationAction
  | IAuthenticationActionRegister
  | IAuthenticationActionLogin
  | IAuthenticationGetUser
  | IAuthenticationUpdate
  | IAuthenticationError
  | IAuthenticationActionExiet;
