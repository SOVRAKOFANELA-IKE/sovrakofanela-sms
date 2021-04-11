import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger } from 'redux-logger'
import { MakeStore } from 'next-redux-wrapper'
import { createWrapper } from 'next-redux-wrapper'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { env } from '../config/vars'

const logger = createLogger({ collapsed: true })

const rootReducer = combineReducers({
})

const persistConfig = {
  key: 'root',
  whitelist: ['auth'],
  storage: storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const initialState = {
}

// middleware
const middleware =
  env === 'development'
    ? composeWithDevTools(applyMiddleware(thunk, logger))
    : applyMiddleware(thunk)

// create a makeStore function
const makeStore: MakeStore<any> = () =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createStore<any, any, any, any>(persistedReducer, initialState, middleware)

// export an assembled wrapper
export const wrapper = createWrapper<any>(makeStore, {
  debug: env === 'development',
})
