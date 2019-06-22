import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import { withStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Home from '@material-ui/icons/Home';
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace';
import Audiotrack from '@material-ui/icons/Audiotrack';
import Delete from '@material-ui/icons/Delete';

import NewWordInput from './NewWordInput';
import {
  playSound,
  getPhoneticSpelling,
  getAudioSrc,
  getWordsFromLocalStorage
} from '../shared/utils';
import { deleteWord } from '../shared/sound-local-storage';
import { getSymbolByKey } from '../assets/data';
import { useRecentWord } from 'store/hooks';
import WordChoiceModal from './WordChoiceModal';
import { Word } from 'shared/types';

const styles = {
  noWord: {
    margin: '15px'
  }
};

const handleSoundToggle = (event: any) => {
  event.preventDefault();

  const audioSrc = event.currentTarget.dataset.src.replace(
    'http://audio.oxforddictionaries.com',
    '/audio'
  );

  playSound(audioSrc);
};

const Words = withStyles(styles)((props: any) => {
  const [words, setWords] = useState<Word[]>(
    getWordsFromLocalStorage(props.symbol.key)
  );
  const recentWord = useRecentWord();

  const handleDeleteToggle = (event: any) => {
    event.preventDefault();

    deleteWord(props.symbol.key, event.currentTarget.dataset.word);
    setWords(getWordsFromLocalStorage(props.symbol.key));
  };

  useEffect(() => {
    if (recentWord) {
      setWords(w => [...w, ...recentWord.selectedSounds]);
    }
  }, [recentWord]);

  return words.length === 0 ? (
    <div className={props.classes.noWord}>
      Not having any word for practicing
    </div>
  ) : (
    <List>
      {words.map((word: Word, i: number) => (
        <ListItem dense key={i}>
          <ListItemText
            primary={`${word.text} /${getPhoneticSpelling(word)}/`}
            secondary={word.lexicalCategory}
          />
          <ListItemSecondaryAction>
            <IconButton
              aria-label="play sound"
              data-src={getAudioSrc(word)}
              onClick={handleSoundToggle}
            >
              <Audiotrack />
            </IconButton>
            <IconButton
              aria-label="delete sound"
              data-word={word.text}
              onClick={handleDeleteToggle}
            >
              <Delete />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
});

const SoundDetail = (props: RouteComponentProps<{ word: string }>) => {
  const [symbol, setSymbol] = useState<any>(
    getSymbolByKey(props.match.params.word)
  );

  return (
    <div className="sound-detail-wrapper">
      <Link className="back-to-home" to="/">
        <IconButton aria-label="back to home">
          <Home /> <KeyboardBackspace />
        </IconButton>
      </Link>
      <div className="sound-detail">
        <div>
          <div className="symbol">{`/${symbol.symbol}/`}</div>
          <IconButton
            aria-label="play sound"
            data-src={`${process.env.PUBLIC_URL}/sounds/${symbol.sound}`}
            onClick={handleSoundToggle}
          >
            <Audiotrack />
          </IconButton>
        </div>
        <Words symbol={symbol} />
        <NewWordInput wordId={props.match.params.word} />
        <WordChoiceModal />
      </div>
    </div>
  );
};

export default SoundDetail;
