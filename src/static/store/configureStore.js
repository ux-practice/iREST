import {createStore, applyMiddleware, compose} from 'redux'
import createSagaMiddleware from 'redux-saga'
import reduxLogger from 'redux-logger'
import ReduxThunk from 'redux-thunk'
import rootReducer from '../reducers'
import rootSaga from '../sagas'

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware()

  const middleware = [sagaMiddleware, ReduxThunk]

  if (process.env.NODE_ENV === 'development') {
    middleware.push(reduxLogger)

    // eslint-disable-next-line no-underscore-dangle
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

    return {
      ...createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware))),
      runSaga: sagaMiddleware.run(rootSaga),
    }
  }

  return {
    ...createStore(rootReducer, applyMiddleware(...middleware)),
    runSaga: sagaMiddleware.run(rootSaga),
  }
}

export default configureStore
