import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import MoreHoriz from 'material-ui-icons/MoreHoriz';

import { playSound } from '../modules/Utils';

class Sound extends React.Component {
  constructor(props) {
    super(props);

    this.handleSoundToggle = this.handleSoundToggle.bind(this);
    this.handleWordToggle = this.handleWordToggle.bind(this);
  }

  handleSoundToggle(e) {
    e.preventDefault();

    playSound(`${process.env.PUBLIC_URL}/sounds/${this.props.sound}`);
  }

  handleWordToggle(e) {
    e.preventDefault();

    playSound(`${process.env.PUBLIC_URL}/sounds/${this.props.soundWord}`);
  }

  render() {
    const { symbol, content } = this.props;

    return (
      <div className="sound">
        <div className="info-wrapper">
          <div className="info" role="presentation" onClick={this.handleSoundToggle}>
            {symbol}
          </div>
        </div>
        <div className="word-wrapper">
          <div className="word" role="presentation" onClick={this.handleWordToggle}>
            {content}
          </div>
        </div>
        <Link className="go-to-sound-detail" to={`/sound/${content}`}>
          <MoreHoriz />
        </Link>
      </div>
    );
  }
}

Sound.propTypes = {
  sound: PropTypes.string.isRequired,
  soundWord: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default connect()(Sound);
