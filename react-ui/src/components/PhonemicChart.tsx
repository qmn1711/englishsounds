import React from 'react';

import Vowel from './Vowel';
import SubChart from './SubChart';
import { data } from 'assets/data';

const PhonemicChart = ({ vowels, consonants }: typeof data) => (
  <div className="phonemic-chart">
    <Vowel vowels={vowels} />
    <SubChart name="consonants" sounds={consonants} />
  </div>
);

export default PhonemicChart;
