/* eslint-disable import/no-extraneous-dependencies */
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import rootRuduser from './reducers'

export const store = createStore(rootRuduser, composeWithDevTools(applyMiddleware(thunk)))

export type RootState = ReturnType<typeof rootRuduser>
