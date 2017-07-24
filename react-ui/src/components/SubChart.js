import React from 'react';
import PropTypes from 'prop-types';
import Sound from './Sound';

const SubChart = ({ name, sounds }) => {
  const generateSounds = () => sounds.map(sound => (
    <Sound content={sound.key} {...sound} />
  ), this);

  const generateContent = () => {
    let content = (
      <div className="content">
        {generateSounds()}
      </div>
    );

    if (name === 'consonants') {
      content = (<div>{content}</div>);
    }

    return content;
  };

  return (
    <div className={name} >
      <h2>{name}</h2>
      {generateContent()}
    </div>
  );
};

SubChart.propTypes = {
  name: PropTypes.string.isRequired,
  sounds: PropTypes.array.isRequired,
};

export default SubChart;
