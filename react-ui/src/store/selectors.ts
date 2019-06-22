export const recentWordSelector = (state: any) => state.modalReducer.recentWord;
export const wordChoiceSelector = (state: any) => ({
  wordId: state.modalReducer.wordId,
  newWord: state.wordReducer.newWord,
  newWordData: state.wordReducer.newWordData,
  errorMsg: state.wordReducer.errorMsg,
  isRequesting: state.wordReducer.isRequesting
});
