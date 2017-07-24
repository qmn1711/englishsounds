import React from 'react';
import PropTypes from 'prop-types';

import Dialog from 'material-ui/Dialog';
import DialogTitle from 'material-ui/Dialog/DialogTitle';
import DialogContent from 'material-ui/Dialog/DialogContent';
import DialogActions from 'material-ui/Dialog/DialogActions';
import List from 'material-ui/List';
import ListItem from 'material-ui/List/ListItem';
import ListItemSecondaryAction from 'material-ui/List/ListItemSecondaryAction';
import ListItemText from 'material-ui/List/ListItemText';
import Button from 'material-ui/Button';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import LinearProgress from 'material-ui/Progress/LinearProgress';
import Audiotrack from 'material-ui-icons/Audiotrack';

import { playSound } from '../modules/Utils';
import { closeModal } from '../actions';
import { addSound } from '../modules/SoundDetailLocalStorage';

class WordChoiceModal extends React.Component {
  static getAudioSrc(sound) {
    return sound.pronunciations ? sound.pronunciations[0].audioFile
      : sound.entries[0].pronunciations[0].audioFile;
  }

  static getPhoneticSpelling(sound) {
    let phoneticSpelling = '';

    if (sound.pronunciations) {
      phoneticSpelling = sound.pronunciations[0].phoneticSpelling;
    } else if (sound.entries[0].pronunciations) {
      phoneticSpelling = sound.entries[0].pronunciations[0].phoneticSpelling;
    }

    return phoneticSpelling;
  }

  static filteroutSamePhoneticSpelling(sounds) {
    const data = {};

    // TODO handle more complex cases
    sounds.forEach((sound) => {
      const phoneticSpelling = WordChoiceModal.getPhoneticSpelling(sound);
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
  }

  constructor(props) {
    super(props);
    this.state = {
      sounds: [],
      selectedSounds: [],
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.handleSoundToggle = this.handleSoundToggle.bind(this);
    this.handleCloseToggle = this.handleCloseToggle.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // Don't need to call setState because connect() already do it, but Eslint complains, lol
    this.setState(Object.assign({}, this.state, {
      sounds: WordChoiceModal.filteroutSamePhoneticSpelling(nextProps.newWordData),
      selectedSounds: [],
    }));
  }

  prepareBeforeLeave(selectedSounds) {
    let recentWord = {};
    if (selectedSounds.length) {
      recentWord = {
        id: this.props.id,
        word: this.props.newWord,
        selectedSounds,
      };
    }

    addSound(recentWord);
    this.props.dispatch(closeModal(recentWord));
    this.setState({ selectedSounds: [] });
  }

  handleToggle(event) {
    event.preventDefault();
    const index = +event.currentTarget.dataset.index;
    const newSelectedSounds = this.state.selectedSounds.slice();
    const selectedIndex = newSelectedSounds.indexOf(index);

    if (newSelectedSounds.indexOf(index) === -1) {
      newSelectedSounds.push(index);
    } else {
      newSelectedSounds.splice(selectedIndex, 1);
    }
    this.setState({
      selectedSounds: newSelectedSounds,
    });
  }

  handleSoundToggle(event) {
    event.preventDefault();

    const audioSrc = event.currentTarget.dataset.src.replace('http://audio.oxforddictionaries.com', '/audio');
    playSound(audioSrc);
  }

  handleCloseToggle(event) {
    event.preventDefault();

    this.state.selectedSounds.sort();
    const selectedSounds = this.props.newWordData.length > 0
      ? this.state.selectedSounds.map(index => this.props.newWordData[index])
      : [];
    this.prepareBeforeLeave(selectedSounds);
  }

  renderProgress() {
    return this.props.isRequesting ? (
      <DialogContent>
        <LinearProgress />
      </DialogContent>
    ) : '';
  }

  renderError() {
    return this.props.errorMsg ? (
      <ListItem dense button>
        <ListItemText primary={this.props.errorMsg} />
      </ListItem>
    ) : '';
  }

  renderItems() {
    return this.state.sounds.map((sound, i) => ((
      <ListItem dense button key={i} data-index={i} onClick={this.handleToggle}>
        <Checkbox
          checked={this.state.selectedSounds.indexOf(i) !== -1}
          tabIndex={`${i}`}
          disableRipple
        />
        <ListItemText primary={`/${WordChoiceModal.getPhoneticSpelling(sound)}/`} secondary={sound.lexicalCategory} />
        <ListItemSecondaryAction>
          <IconButton
            aria-label="Comments"
            data-src={WordChoiceModal.getAudioSrc(sound)}
            onClick={this.handleSoundToggle}
          >
            <Audiotrack />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>)
    ));
  }

  render() {
    if (!this.props.open) {
      return null;
    }

    // if (this.state.sounds.length === 1) {
    //   this.prepareBeforeLeave(this.state.sounds[0]);
    //   return false;
    // }

    return (
      <Dialog onRequestClose={this.handleCloseToggle} open={this.props.open}>
        <DialogTitle>Choose wanted sounds for {`"${this.props.newWord}"`}</DialogTitle>
        {this.renderProgress()}
        <List>
          {this.renderError() || this.renderItems()}
        </List>
        <DialogActions>
          <Button onClick={this.handleCloseToggle} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

WordChoiceModal.propTypes = {
  id: PropTypes.string.isRequired,
  newWord: PropTypes.string,
  newWordData: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  isRequesting: PropTypes.bool,
  open: PropTypes.bool,
  errorMsg: PropTypes.string,
};

WordChoiceModal.defaultProps = {
  newWord: undefined,
  isRequesting: undefined,
  open: undefined,
  errorMsg: undefined,
};


export default WordChoiceModal;
