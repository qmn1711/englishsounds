import { put, takeEvery, all, call } from 'redux-saga/effects';
import { FETCH_WORD_DATA } from './types';
import {
  openModal,
  wordExistedError,
  addNewWord,
  receiveNewWordData,
  receiveError
} from './actions';
import { getWord } from 'shared/sound-local-storage';
import axios from 'axios';

const PROXY_API = '/proxy/api/v2/entries/en-us';

export function* fetchWordData(action: any) {
  const { wordId, word } = action.payload;
  yield put(openModal(wordId));
  if (getWord(wordId, word)) {
    yield put(
      wordExistedError(`Your list already contains '${word}',
      please delete all sounds of '${word}' before adding new one`)
    );
  } else {
    try {
      yield put(addNewWord(word));
      const response: any = yield call(axios.get, `${PROXY_API}/${word}`);
      yield put(receiveNewWordData(response.data.results[0].lexicalEntries));
    } catch (error) {
      yield put(receiveError(error.message));
    }
  }
}

function* watchFetchWordData() {
  yield takeEvery(FETCH_WORD_DATA, fetchWordData);
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([watchFetchWordData()]);
}
