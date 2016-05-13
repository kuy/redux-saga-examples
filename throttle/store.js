import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers';
import rootSaga from './sagas';
import DevTools from './dev-tools';
import sagaMonitor from './saga-monitor';

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(sagaMiddleware),
      DevTools.instrument()
    )
  );
  sagaMiddleware.run(rootSaga);
  return store;
};
