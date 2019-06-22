import React from 'react';

import SubChart from './SubChart';

const Vowel = ({ vowels }: any) => (
  <div className="vowels">
    <SubChart name="monophthongs" sounds={vowels.monophthongs} />
    <SubChart name="diphthongs" sounds={vowels.diphthongs} />
  </div>
);

export default Vowel;
