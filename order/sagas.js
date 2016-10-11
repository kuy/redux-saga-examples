import { call, fork, take, put } from 'redux-saga/effects';
import { eventChannel, buffers } from 'redux-saga';
import { REQUEST_SOMETHING, successSomething, failureSomething } from './actions';

function api(duration) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ data: `OK: ${duration}` });
    }, duration);
  });
}

function* runRequest(duration) {
  const { data, error } = yield call(api, duration);
  if (data && !error) {
    return successSomething(data);
  } else {
    return failureSomething(error);
  }
}

export function* watchRequest(buffer) {
  while (true) {
    const { payload } = yield take(REQUEST_SOMETHING);
    const task = yield fork(runRequest, payload);
    buffer.push(task);
  }
}

export function order(buffer) {
  return eventChannel(emit => {
    buffer.subscribe(action => {
      console.log('emit', action);
      emit(action);
    });
    return () => buffer.unsubscribe();
  }, buffers.expanding(20));
}

export function* handleRequest() {
  const buffer = [];
  buffer.push = function(...args) {
    Array.prototype.push.apply(buffer, args);
    console.log('push', buffer.length);

    function notify(action) {
      console.log('notify', action);
      buffer.listeners.forEach(cb => cb(action));
    }

    function next() {
      console.log('next:length', buffer.length);
      if (buffer.waiting) {
        console.log('waiting');
        return;
      }

      const task = buffer.shift();
      if (task) {
        console.log('task', task);
        task.done.then(action => {
          console.log('then');
          notify(action);
          buffer.waiting = false;
          next();
        }).catch(action => {
          console.log('catch');
          notify(action);
          buffer.waiting = false;
          next();
        });
        buffer.waiting = true;
      } else {
        console.log('task', 'none');
        buffer.waiting = false;
      }
    }

    next();
  };
  buffer.subscribe = function(cb) {
    if (!buffer.listeners) {
      buffer.listeners = [];
    }
    buffer.listeners.push(cb);
  };
  buffer.unsubscribe = function() {
    console.log('unsubscribe');
  };
  yield fork(watchRequest, buffer);

  const channel = order(buffer);
  while (true) {
    const action = yield take(channel);
    console.log('action', action);
    yield put(action);
  }
}

export default function* rootSaga() {
  yield fork(handleRequest);
}
