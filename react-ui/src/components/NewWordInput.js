import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createStyleSheet, withStyles } from 'material-ui/styles';
import Input from 'material-ui/Input/Input';
import IconButton from 'material-ui/IconButton';
import AddBox from 'material-ui-icons/AddBox';

import { fetchWordData } from '../actions';

const styleSheet = createStyleSheet('NewWordInput', () => ({
  root: {
    'margin-left': '15px',
  },
  input: {
    position: 'relative',
    top: '-8px',
  },
}));

class NewWordInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.recentWord && nextProps.recentWord.selectedSounds) {
      this.setState({ value: '' });
    }
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    this.props.dispatch(fetchWordData(this.state.value));
    event.preventDefault();
  }

  render() {
    const classes = this.props.classes;

    return (
      <form className={classes.root} onSubmit={this.handleSubmit}>
        <Input
          className={classes.input}
          value={this.state.value}
          placeholder="Add more words to practice"
          onChange={this.handleChange}
        />
        <IconButton onClick={this.handleSubmit}>
          <AddBox />
        </IconButton>
      </form>
    );
  }
}

NewWordInput.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  recentWord: PropTypes.object,
};

NewWordInput.defaultProps = {
  recentWord: undefined,
};

const NewWordInputWithStyles = withStyles(styleSheet)(NewWordInput);
export default connect(state =>
  ({ recentWord: state.modalReducer.recentWord }))(NewWordInputWithStyles);
