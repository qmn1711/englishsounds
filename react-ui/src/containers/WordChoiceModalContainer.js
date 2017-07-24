import { connect } from 'react-redux';
import WordChoiceModal from '../components/WordChoiceModal';
import { getSoundDetailId } from '../modules/Utils';

const mapStateToProps = state => ({
  id: getSoundDetailId(state.router),
  open: state.modalReducer.open,
  newWord: state.wordReducer.newWord,
  newWordData: state.wordReducer.newWordData,
  errorMsg: state.wordReducer.errorMsg,
  isRequesting: state.wordReducer.isRequesting,
});

const WordChoiceModalContainer = connect(
  mapStateToProps,
)(WordChoiceModal);

export default WordChoiceModalContainer;
