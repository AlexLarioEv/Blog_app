import { IAuthenticationState, TAuthenticationAction, EAuthenticationActionTypes } from '../../types/authentication'

const initState: IAuthenticationState = {
  user: {
    email: '',
    token: '',
    username: '',
    bio: '',
    image: '',
  },
  login: false,
  loading: false,
  error: null,
}

const AuthenticationReducer = (state = initState, action: TAuthenticationAction): IAuthenticationState => {
  switch (action.type) {
    case EAuthenticationActionTypes.FETCH_AUTHENTICATION:
      return { ...state, loading: true, error: null }
    case EAuthenticationActionTypes.FETCH_AUTHENTICATION_REGISTER:
      return {
        ...state,
        loading: false,
        user: action.payload,
      }
    case EAuthenticationActionTypes.FETCH_AUTHENTICATION_LOGIN:
      return { ...state, login: true, loading: false, user: action.payload }
    case EAuthenticationActionTypes.FETCH_AUTHENTICATION_GET_USER:
      return {
        ...state,
        login: true,
        loading: false,
        user: action.payload,
      }
    case EAuthenticationActionTypes.FETCH_AUTHENTICATION_UPDATE:
      return { ...state, loading: false, user: action.payload }
    case EAuthenticationActionTypes.FETCH_AUTHENTICATION_ERROR:
      return { ...state, loading: false, error: action.payload }
    case EAuthenticationActionTypes.FETCH_AUTHENTICATION_EXIET:
      return {
        ...state,
        login: false,
        user: {
          email: '',
          token: '',
          username: '',
          bio: '',
          image: '',
        },
      }
    default:
      return state
  }
}
export default AuthenticationReducer
