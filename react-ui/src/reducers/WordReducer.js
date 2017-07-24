const wordReducer = (state = { newWordData: [] }, action) => {
  switch (action.type) {
    case 'ADD_NEW_WORD':
      return Object.assign({}, state, {
        newWord: action.newWord,
        isRequesting: true,
      });
    case 'RECEIVE_NEW_WORD':
      return Object.assign({}, state, {
        newWordData: action.newWordData,
        isRequesting: false,
      });
    case 'RECEIVE_ERROR':
    case 'WORD_EXISTED_ERROR':
      return Object.assign({}, state, {
        errorMsg: action.errorMsg,
        isRequesting: false,
      });
    case 'CLOSE_MODAL':
      return { newWordData: [] };
    default:
      return state;
  }
};

export default wordReducer;
