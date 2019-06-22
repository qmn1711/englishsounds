import React, { useState, useEffect } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import Audiotrack from '@material-ui/icons/Audiotrack';

import { playSound, getAudioSrc, getPhoneticSpelling } from '../shared/utils';
import { addSound } from '../shared/sound-local-storage';
import { useWordChoide } from 'store/hooks';
import { Word } from 'shared/types';

const filteroutSamePhoneticSpelling = (sounds: Word[]) => {
  const data: any = {};

  // TODO handle more complex cases
  sounds.forEach(sound => {
    const phoneticSpelling = getPhoneticSpelling(sound);
    if (!phoneticSpelling) {
      // Do nothing
    } else if (data[phoneticSpelling]) {
      data[phoneticSpelling].lexicalCategory += `, ${sound.lexicalCategory}`;
    } else {
      data[phoneticSpelling] = sound;
    }
  });

  const filteredSounds = Object.keys(data).map(key => data[key]);
  if (filteredSounds.length === 1) {
    filteredSounds[0].lexicalCategory = '';
  }

  return filteredSounds;
};

const WordChoiceModal = () => {
  const [sounds, setSounds] = useState<any[]>([]);
  const [selectedSounds, setSelectedSounds] = useState<any[]>([]);
  const {
    wordId,
    newWord,
    errorMsg,
    isRequesting,
    newWordData,
    closeModal
  } = useWordChoide();

  const prepareBeforeLeave = (selectedSounds: any) => {
    let recentWord: any = {};
    if (selectedSounds.length) {
      recentWord = {
        id: wordId,
        word: newWord,
        selectedSounds
      };
    }

    addSound(recentWord);
    closeModal(recentWord);
    setSelectedSounds([]);
  };

  const handleToggle = (event: any) => {
    event.preventDefault();
    const index = +event.currentTarget.dataset.index;
    const newSelectedSounds = selectedSounds.slice();
    const selectedIndex = newSelectedSounds.indexOf(index);

    if (newSelectedSounds.indexOf(index) === -1) {
      newSelectedSounds.push(index);
    } else {
      newSelectedSounds.splice(selectedIndex, 1);
    }
    setSelectedSounds(newSelectedSounds);
  };

  const handleSoundToggle = (event: any) => {
    event.preventDefault();

    const audioSrc = event.currentTarget.dataset.src.replace(
      'http://audio.oxforddictionaries.com',
      '/audio'
    );
    playSound(audioSrc);
  };

  const handleCloseToggle = (event: any) => {
    event.preventDefault();

    selectedSounds.sort();
    const selectedSoundsFromIndexes =
      newWordData.length > 0
        ? selectedSounds.map(index => newWordData[index])
        : [];
    prepareBeforeLeave(selectedSoundsFromIndexes);
  };

  useEffect(() => {
    setSounds(filteroutSamePhoneticSpelling(newWordData));
  }, [newWordData]);

  const renderProgress = () => {
    return isRequesting ? (
      <DialogContent>
        <LinearProgress />
      </DialogContent>
    ) : (
      ''
    );
  };

  const renderError = () => {
    return errorMsg ? (
      <ListItem dense button>
        <ListItemText primary={errorMsg} />
      </ListItem>
    ) : (
      ''
    );
  };

  const renderItems = () => {
    return sounds.map((sound: any, i: any) => (
      <ListItem dense button key={i} data-index={i} onClick={handleToggle}>
        <Checkbox
          checked={selectedSounds.indexOf(i) !== -1}
          tabIndex={i}
          disableRipple
        />
        <ListItemText
          primary={`/${getPhoneticSpelling(sound)}/`}
          secondary={sound.lexicalCategory}
        />
        <ListItemSecondaryAction>
          <IconButton
            aria-label="Comments"
            data-src={getAudioSrc(sound)}
            onClick={handleSoundToggle}
          >
            <Audiotrack />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ));
  };

  return wordId ? (
    <Dialog onClose={handleCloseToggle} open={!!wordId}>
      <DialogTitle>Choose wanted sounds for {`"${newWord}"`}</DialogTitle>
      {renderProgress()}
      <List>{renderError() || renderItems()}</List>
      <DialogActions>
        <Button onClick={handleCloseToggle} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  ) : null;
};

export default WordChoiceModal;
