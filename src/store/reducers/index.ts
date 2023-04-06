import { combineReducers } from 'redux'

import ArticleReducer from './articleReducers'
import AuthenticationReducer from './authenticationReducers'

const rootRuduser = combineReducers({
  article: ArticleReducer,
  authentication: AuthenticationReducer,
})
export default rootRuduser
