import { useSelector } from 'react-redux';
import { getBaseColor, getSecondaryBaseColor } from '../selectors';

export const useBaseColor = () => {
  return useSelector(getBaseColor);
};

export const useSecondaryBaseColor = () => {
  return useSelector(getSecondaryBaseColor);
};
