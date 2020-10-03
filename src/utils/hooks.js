import { useSelector } from 'react-redux';

export const useBaseColor = () => {
  return useSelector((state) => state.color.baseColor);
};

export const useSecondaryBaseColor = () => {
  return useSelector((state) => state.color.secondaryBaseColor);
};
