import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers';
import rootSaga from './sagas';
import DevTools from './dev-tools';

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
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
