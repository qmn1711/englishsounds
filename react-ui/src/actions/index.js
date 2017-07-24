import axios from 'axios';
import { getWord } from '../modules/SoundDetailLocalStorage';
import { getSoundDetailId } from '../modules/Utils';

export const addNewWord = newWord => ({
  type: 'ADD_NEW_WORD',
  newWord,
});

export const receiveNewWordData = newWordData => ({
  type: 'RECEIVE_NEW_WORD',
  newWordData,
});

export const receiveError = errorMsg => ({
  type: 'RECEIVE_ERROR',
  errorMsg,
});

export const wordExistedError = errorMsg => ({
  type: 'WORD_EXISTED_ERROR',
  errorMsg,
});

export const openModal = () => ({
  type: 'OPEN_MODAL',
});

export const closeModal = recentWord => ({
  type: 'CLOSE_MODAL',
  recentWord,
});

// const API = 'https://od-api.oxforddictionaries.com/api/v1'
export const fetchWordData = word => (dispatch, getState) => {
  dispatch(openModal());
  if (getWord(getSoundDetailId(getState().router), word)) {
    dispatch(wordExistedError(`Your list already contains '${word}',
      please delete all sounds of '${word}' before adding new one`));
  } else {
    dispatch(addNewWord(word));
    axios.get(`/proxy/api/v1/entries/en/${word}`)
      .then(response => dispatch(receiveNewWordData(response.data.results[0].lexicalEntries)))
      .catch(error => dispatch(receiveError(error.message)));
  }
};
