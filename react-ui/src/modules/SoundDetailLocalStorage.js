export const getAllWordsById = (id) => {
  const words = localStorage.getItem(id);
  return words ? JSON.parse(words) : {};
};

export const getWord = (id, word) => getAllWordsById(id)[word];

export const deleteWord = (id, word) => {
  const words = getAllWordsById(id);
  delete words[word];
  localStorage.setItem(id, JSON.stringify(words));
};

export const addSound = ({ id, word, selectedSounds }) => {
  if (selectedSounds && Object.keys(selectedSounds).length) {
    const allWordById = getAllWordsById(id);
    allWordById[word] = selectedSounds;
    localStorage.setItem(id, JSON.stringify(allWordById));
  }
};
