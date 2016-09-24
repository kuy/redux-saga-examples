import 'babel-polyfill';
import assert from 'assert';
import { handleActions, takex, takexSaga } from '../sagas';
import { fork, take } from 'redux-saga/effects';

describe('sagas', () => {
  describe('.handleActions', () => {
    it('takes filtered actions', () => {
      const saga = handleActions();
      let ret = saga.next();
      assert.deepStrictEqual(ret.value, takex(/^FETCH_/));
      assert(!ret.done);
    });
  });

  describe('.takexSaga', () => {
    it('takes an action matching given regex', () => {
      const saga = takexSaga(/^FETCH_/);
      let ret = saga.next();
      assert.deepStrictEqual(ret.value, take('*'));
      assert(!ret.done);

      const action = { type: 'FETCH_FOO' };
      ret = saga.next(action);
      assert.deepStrictEqual(ret.value, action);
      assert(ret.done);
    });

    it('ignores an action', () => {
      const saga = takexSaga(/^FETCH_/);
      let ret = saga.next();
      assert.deepStrictEqual(ret.value, take('*'));
      assert(!ret.done);

      const action = { type: 'SUCCESS_FOO' };
      ret = saga.next(action);
      assert.deepStrictEqual(ret.value, take('*'));
      assert(!ret.done);
    });
  });
});
