import React from 'react';
import PropTypes from 'prop-types';
import Vowel from './components/Vowel';
import SubChart from './components/SubChart';

// PhonemicChart
// Vowels: Monophthongs, Diphthongs
// Consonants

const PhonemicChart = ({ vowels, consonants }) => ((
  <div className="phonemic-chart">
    <Vowel vowels={vowels} />
    <SubChart name="consonants" sounds={consonants} />
  </div>
));

PhonemicChart.propTypes = {
  vowels: PropTypes.object.isRequired,
  consonants: PropTypes.array.isRequired,
};

export default PhonemicChart;
