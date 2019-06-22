const modalReducer = (state = {}, action: any) => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return Object.assign({}, state, {
        wordId: action.payload
      });
    case 'CLOSE_MODAL':
      const partialState = Object.keys(action.recentWord).length
        ? {
            wordId: undefined,
            recentWord: action.recentWord
          }
        : {
            wordId: undefined
          };

      return Object.assign({}, state, partialState);
    default:
      return state;
  }
};

export default modalReducer;
