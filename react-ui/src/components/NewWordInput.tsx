import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/styles';
import Input from '@material-ui/core/Input/Input';
import IconButton from '@material-ui/core/IconButton';
import AddBox from '@material-ui/icons/AddBox';
import { useDispatch } from 'react-redux';

import { useRecentWord } from 'store/hooks';
import { fetchWordData } from 'store/actions';

const styles = {
  root: {
    'margin-left': '15px'
  },
  input: {
    position: 'relative',
    top: '-8px'
  }
};

const NewWordInput = (props: any) => {
  const [value, setValue] = useState('');
  const recentWords = useRecentWord();
  const dispatch = useDispatch();

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    dispatch(fetchWordData(props.wordId, value));
  };

  useEffect(() => {
    setValue('');
  }, [recentWords]);

  return (
    <form className={props.classes.root} onSubmit={handleSubmit}>
      <Input
        className={props.classes.input}
        value={value}
        placeholder="Add more words to practice"
        onChange={handleChange}
      />
      <IconButton onClick={handleSubmit}>
        <AddBox />
      </IconButton>
    </form>
  );
};

export default withStyles({})(NewWordInput);
