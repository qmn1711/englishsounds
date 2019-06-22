import React from 'react';
import { Link } from 'react-router-dom';
import MoreHoriz from '@material-ui/icons/MoreHoriz';

import { playSound } from '../shared/utils';

const Sound = (props: any) => {
  const handleSoundToggle = (e: any) => {
    e.preventDefault();

    playSound(`${process.env.PUBLIC_URL}/sounds/${props.sound}`);
  };

  const handleWordToggle = (e: any) => {
    e.preventDefault();

    playSound(`${process.env.PUBLIC_URL}/sounds/${props.soundWord}`);
  };

  return (
    <div className="sound">
      <div className="info-wrapper">
        <div className="info" role="presentation" onClick={handleSoundToggle}>
          {props.symbol}
        </div>
      </div>
      <div className="word-wrapper">
        <div className="word" role="presentation" onClick={handleWordToggle}>
          {props.content}
        </div>
      </div>
      <Link className="go-to-sound-detail" to={`/sound/${props.content}`}>
        <MoreHoriz />
      </Link>
    </div>
  );
};

export default Sound;
