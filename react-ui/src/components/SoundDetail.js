import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { createStyleSheet, withStyles } from 'material-ui/styles';
import List from 'material-ui/List';
import ListItem from 'material-ui/List/ListItem';
import ListItemSecondaryAction from 'material-ui/List/ListItemSecondaryAction';
import ListItemText from 'material-ui/List/ListItemText';
import IconButton from 'material-ui/IconButton';
import Home from 'material-ui-icons/Home';
import KeyboardBackspace from 'material-ui-icons/KeyboardBackspace';
import Audiotrack from 'material-ui-icons/Audiotrack';
import Delete from 'material-ui-icons/Delete';

import NewWordInput from './NewWordInput';
import WordChoiceModalContainer from '../containers/WordChoiceModalContainer';
import { playSound } from '../modules/Utils';
import { getAllWordsById, deleteWord } from '../modules/SoundDetailLocalStorage';
import { getSymbolByKey } from '../data';

const styleSheet = createStyleSheet('SoundDetail', () => ({
  noWord: {
    margin: '15px',
  },
}));

class SoundDetail extends Component {
  static getAudioSrc(word) {
    return word.pronunciations ? word.pronunciations[0].audioFile
      : word.entries[0].pronunciations[0].audioFile;
  }

  static getPhoneticSpelling(word) {
    return word.pronunciations ? word.pronunciations[0].phoneticSpelling
      : word.entries[0].pronunciations[0].phoneticSpelling;
  }

  static getWordsFromLocalStorage(id) {
    const allWordsById = getAllWordsById(id);
    return Object.keys(allWordsById)
      .map(key => allWordsById[key])
      .reduce((total, word) => total.concat(word), []);
  }

  constructor(props) {
    super(props);

    this.state = {
      symbol: {},
      words: [],
    };

    this.handleSoundToggle = this.handleSoundToggle.bind(this);
    this.handleDeleteToggle = this.handleDeleteToggle.bind(this);
  }

  componentWillMount() {
    const symbol = getSymbolByKey(this.props.match.params.word);

    this.setState(Object.assign({}, this.state, {
      symbol,
      words: SoundDetail.getWordsFromLocalStorage(symbol.key),
    }));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.recentWord && nextProps.recentWord.selectedSounds) {
      this.setState(Object.assign({}, this.state, {
        words: [...this.state.words, ...nextProps.recentWord.selectedSounds],
      }));
    }
  }

  handleSoundToggle(event) {
    event.preventDefault();

    const audioSrc = event.currentTarget.dataset.src.replace('http://audio.oxforddictionaries.com', '/audio');
    playSound(audioSrc);
  }

  handleDeleteToggle(event) {
    event.preventDefault();

    deleteWord(this.state.symbol.key, event.currentTarget.dataset.word);
    this.setState({ words: SoundDetail.getWordsFromLocalStorage(this.state.symbol.key) });
  }

  renderWords() {
    if (this.state.words.length < 1) {
      return (<div className={this.props.classes.noWord}>Not having any word for practicing</div>);
    }

    return (<List>
      {this.state.words.map((word, i) =>
        ((<ListItem dense key={i}>
          <ListItemText primary={`${word.text} /${SoundDetail.getPhoneticSpelling(word)}/`} secondary={word.lexicalCategory} />
          <ListItemSecondaryAction>
            <IconButton
              aria-label="play sound"
              data-src={SoundDetail.getAudioSrc(word)}
              onClick={this.handleSoundToggle}
            >
              <Audiotrack />
            </IconButton>
            <IconButton
              aria-label="delete sound"
              data-word={word.text}
              onClick={this.handleDeleteToggle}
            >
              <Delete />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>)))
      }
    </List>);
  }

  render() {
    return (
      <div className="sound-detail-wrapper">
        <Link className="back-to-home" to="/">
          <IconButton aria-label="back to home">
            <Home /> <KeyboardBackspace />
          </IconButton>
        </Link>
        <div className="sound-detail">
          <div>
            <div className="symbol">{`/${this.state.symbol.symbol}/`}</div>
            <IconButton
              aria-label="play sound"
              data-src={`${process.env.PUBLIC_URL}/sounds/${this.state.symbol.sound}`}
              onClick={this.handleSoundToggle}
            >
              <Audiotrack />
            </IconButton>
          </div>
          {this.renderWords()}
          <NewWordInput />
          <WordChoiceModalContainer open={false} />
        </div>
      </div>
    );
  }
}

SoundDetail.propTypes = {
  match: PropTypes.object.isRequired,
  recentWord: PropTypes.object,
  classes: PropTypes.object.isRequired,
};

SoundDetail.defaultProps = {
  recentWord: undefined,
};


export default withStyles(styleSheet)(SoundDetail);
