import { eventChannel } from 'redux-saga';
import { put, fork, call, take } from 'redux-saga/effects';

// NOTE: Need buffer? If the handler is called before waiting
//       an event by 'take' effect, it will miss somewhat events.
function newOps(name = 'data') {
  const o = {};
  const ch = eventChannel(emit => {
    o.handler = obj => {
      emit({ [name]: obj });
    };
    return () => {};
  });
  ch.handler = o.handler;
  return ch;
}

function newKey(path) {
  return firebase.database().ref().child(path).push().key;
}

// TODO: Handle errors
export function* get(path, key) {
  const ops = newOps('error');
  const ref = firebase.database().ref(`${path}/${key}`);
  const data = yield call([ref, ref.once], 'value');
  return data.val();
}

export function* create(path, fn) {
  const key = yield call(newKey, path);
  const payload = yield call(fn, key);
  const ops = newOps('error');
  const ref = firebase.database().ref();
  const [ _, { error } ] = yield [
    call([ref, ref.update], payload, ops.handler),
    take(ops)
  ];
  return error;
}

export function* update(path, key, payload) {
  if (typeof payload === 'function') {
    payload = yield call(payload);
  }
  const ops = newOps('error');
  const ref = firebase.database().ref(`${path}/${key}`);
  const [ _, { error } ] = yield [
    call([ref, ref.update], payload, ops.handler),
    take(ops)
  ];
  return error;
}

function* runSync(ref, eventType, creator) {
  const ops = newOps();
  yield call([ref, ref.on], eventType, ops.handler);

  while (true) {
    const { data } = yield take(ops);
    yield put(creator({ data }));
  }
}

const EVENT_TYPES = ['child_added', 'child_removed'];
export function* sync(path, mapEventToAction = {}) {
  const ref = firebase.database().ref(path).limitToLast(20);
  for (let type of EVENT_TYPES) {
    const action = mapEventToAction[type];
    if (typeof action === 'function') {
      yield fork(runSync, ref, type, action);
    }
  }
}
