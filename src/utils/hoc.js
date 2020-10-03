import React from 'react';
import { useDispatch } from 'react-redux';
import { useBaseColor, useSecondaryBaseColor } from './hooks';

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
        dispatch({ type: 'SET_BASE_COLOR', color });
      }}
      setSecondaryBaseColor={(color) => {
        dispatch({ type: 'SET_SECONDARY_BASE_COLOR', color });
      }}
    />
  );
};
