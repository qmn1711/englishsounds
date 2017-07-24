import { connect } from 'react-redux';
import SoundDetail from '../components/SoundDetail';
import { getSoundDetailId } from '../modules/Utils';

const mapStateToProps = state => ({
  id: getSoundDetailId(state.router),
  recentWord: state.modalReducer.recentWord,
});

const SoundDetailContainer = connect(
  mapStateToProps,
)(SoundDetail);

export default SoundDetailContainer;
