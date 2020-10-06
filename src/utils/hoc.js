import React from 'react';
import { useDispatch } from 'react-redux';
import { useBaseColor, useSecondaryBaseColor } from './hooks';
import { setBaseColor, setSecondaryBaseColor } from '../actions';

export const withBaseColor = (Component) => (props) => {
  const dispatch = useDispatch();
  const baseColor = useBaseColor();
  const secondaryBaseColor = useSecondaryBaseColor();
  return (
    <Component
      {...props}
      baseColor={baseColor}
      secondaryBaseColor={secondaryBaseColor}
      setBaseColor={(color) => {
        dispatch(setBaseColor(color));
      }}
      setSecondaryBaseColor={(color) => {
        dispatch(setSecondaryBaseColor(color));
      }}
    />
  );
};
