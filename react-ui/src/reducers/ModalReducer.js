const modalReducer = (state = {}, action) => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return Object.assign({}, state, {
        open: true,
      });
    case 'CLOSE_MODAL':
      return Object.assign({}, state, {
        open: false,
        recentWord: action.recentWord,
      });
    default:
      return state;
  }
};

export default modalReducer;
