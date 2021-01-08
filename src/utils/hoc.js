import React from 'react';
import { useDispatch } from 'react-redux';
import { useBaseColor, useSecondaryBaseColor } from './hooks';
import { setBaseColor, setSecondaryBaseColor } from '../actions';

export function withBaseColor(WrappedComponent) {
  const WithBaseColor = (props) => {
    const dispatch = useDispatch();
    const baseColor = useBaseColor();
    const secondaryBaseColor = useSecondaryBaseColor();
    return (
      <WrappedComponent
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
  WithBaseColor.displayName = `WithBaseColor(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;
  return WithBaseColor;
}
