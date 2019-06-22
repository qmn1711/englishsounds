export const getAllWordsById = (id: string) => {
  const words = localStorage.getItem(id);
  return words ? JSON.parse(words) : {};
};

export const getWord = (id: string, word: any) => getAllWordsById(id)[word];

export const deleteWord = (id: string, word: any) => {
  const words = getAllWordsById(id);
  delete words[word];
  localStorage.setItem(id, JSON.stringify(words));
};

export const addSound = ({ id, word, selectedSounds }: any) => {
  if (selectedSounds && Object.keys(selectedSounds).length) {
    const allWordById = getAllWordsById(id);
    allWordById[word] = selectedSounds;
    localStorage.setItem(id, JSON.stringify(allWordById));
  }
};
