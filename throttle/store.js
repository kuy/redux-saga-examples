import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers';
import rootSaga from './sagas';
import DevTools from './dev-tools';
// import SagaVisualizer from 'redux-devtools-saga-visualizer';

export default function configureStore(initialState) {
  // const sagaMonitor = SagaVisualizer.monitor();
  // const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(sagaMiddleware),
      // sagaMonitor,
      DevTools.instrument()
    )
  );
  sagaMiddleware.run(rootSaga);
  return store;
};
