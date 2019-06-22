import { useSelector, useDispatch } from 'react-redux';
import { recentWordSelector, wordChoiceSelector } from './selectors';
import { closeModal } from 'store/actions';

export function useRecentWord() {
  return useSelector(recentWordSelector);
}

export function useWordChoide() {
  const data = useSelector(wordChoiceSelector);
  const dispatch = useDispatch();
  return {
    ...data,
    closeModal: (recentWord: any) => dispatch(closeModal(recentWord))
  };
}
