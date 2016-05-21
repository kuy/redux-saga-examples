import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers';
import rootSaga from './sagas';
import DevTools from './dev-tools';
import { actions } from 'redux-devtools-saga-visualizer';

function createEnhancer() {
  const enhancerFn = createStore => (reducer, initialState, enhancer) => {
    const store = createStore(reducer, initialState, enhancer);
    const dispatch = store.liftedStore.dispatch;
    enhancerFn.monitor.effectTriggered = function (desc) {
      // console.log('Saga visualizer: effectTriggered:', desc);
      dispatch(actions.performEffect(desc));
    };
    enhancerFn.monitor.effectResolved = function (effectId, result) {
      // console.log('Saga visualizer: effectResolved:', effectId, result);
    };
    enhancerFn.monitor.effectRejected = function (effectId, error) {
      // console.log('Saga visualizer: effectRejected:', effectId, error);
    };
    enhancerFn.monitor.effectCancelled = function (effectId) {
      // console.log('Saga visualizer: effectCancelled:', effectId);
    };
    return store;
  };
  enhancerFn.monitor = {};
  return enhancerFn;
}

export default function configureStore(initialState) {
  const enhancer = createEnhancer();
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor: enhancer.monitor });
  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(sagaMiddleware),
      enhancer,
      DevTools.instrument()
    )
  );
  sagaMiddleware.run(rootSaga);
  return store;
};
