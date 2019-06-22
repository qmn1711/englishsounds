import React from 'react';

import Sound from './Sound';

const SubChart = ({ name, sounds }: any) => {
  const generateSounds = () =>
    sounds.map((sound: any) => <Sound content={sound.key} {...sound} />);

  const generateContent = () => {
    let content = <div className="content">{generateSounds()}</div>;

    if (name === 'consonants') {
      content = <div>{content}</div>;
    }

    return content;
  };

  return (
    <div className={name}>
      <h2>{name}</h2>
      {generateContent()}
    </div>
  );
};

export default SubChart;
