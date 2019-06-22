import { Howl } from 'howler';

import { getAllWordsById } from './sound-local-storage';
import { Word, Pronunciation } from './types';

export const playSound = (audioSrc: any) => {
  const sound = new Howl({
    src: [audioSrc]
  });

  sound.play();
};

export const getAudioSrc = (word: Word) => {
  const pronunciation = getFirstAvailableAudioPronuncation(word);
  return pronunciation ? pronunciation.audioFile : undefined;
};

export const getPhoneticSpelling = (word: Word) => {
  const pronunciation = getFirstAvailableAudioPronuncation(word);
  return pronunciation ? pronunciation.phoneticSpelling : undefined;
};

export const getFirstAvailableAudioPronuncation = (word: Word) => {
  let pronunciation: Pronunciation | undefined;

  if (word.pronunciations && word.pronunciations.length) {
    for (const tmpPronuncation of word.pronunciations) {
      if (tmpPronuncation.audioFile) {
        pronunciation = tmpPronuncation;
        break;
      }
    }
  } else {
    pronunciation = word.entries[0].pronunciations[0];
  }

  return pronunciation;
};

export const getWordsFromLocalStorage = (id: any) => {
  const allWordsById = getAllWordsById(id);
  return Object.keys(allWordsById)
    .map(key => allWordsById[key])
    .reduce((total, word) => total.concat(word), []);
};
