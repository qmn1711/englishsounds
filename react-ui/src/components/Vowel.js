import React from 'react';
import PropTypes from 'prop-types';
import SubChart from './SubChart';

const Vowel = ({ vowels }) => ((
  <div className="vowels">
    <SubChart name="monophthongs" sounds={vowels.monophthongs} />
    <SubChart name="diphthongs" sounds={vowels.diphthongs} />
  </div>
));

Vowel.propTypes = {
  vowels: PropTypes.object.isRequired,
};

export default Vowel;
