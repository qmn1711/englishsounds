import {
  ADD_NEW_WORD,
  RECEIVE_NEW_WORD,
  RECEIVE_ERROR,
  WORD_EXISTED_ERROR,
  OPEN_MODAL,
  CLOSE_MODAL,
  FETCH_WORD_DATA
} from 'store/types';

export const addNewWord = (newWord: any) => ({
  type: ADD_NEW_WORD,
  newWord
});

export const receiveNewWordData = (newWordData: any) => ({
  type: RECEIVE_NEW_WORD,
  newWordData
});

export const receiveError = (errorMsg: any) => ({
  type: RECEIVE_ERROR,
  errorMsg
});

export const wordExistedError = (errorMsg: any) => ({
  type: WORD_EXISTED_ERROR,
  errorMsg
});

export const openModal = (wordId: string) => ({
  type: OPEN_MODAL,
  payload: wordId
});

export const closeModal = (recentWord: any) => ({
  type: CLOSE_MODAL,
  recentWord
});

export const fetchWordData = (wordId: string, word: any) => ({
  type: FETCH_WORD_DATA,
  payload: {
    wordId,
    word
  }
});
