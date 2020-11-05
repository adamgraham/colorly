import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import Color from 'color';
import {
  MaterialIcon,
  MaterialIconButton,
  MaterialInput,
} from '../components/material';
import { enterKeyHandler } from '../utils/eventHandlers';
import './ColorPicker.css';

const ColorPicker = React.forwardRef(
  (
    {
      className,
      id = 'color-picker',
      alignment = 'left',
      allowRedo = true,
      allowUndo = true,
      onColorChange = () => {},
      onShuffleClick = () => {},
      onUndoClick = () => {},
      onRedoClick = () => {},
      value,
    },
    ref
  ) => {
    const [color, setColor] = useState({ input: '#000000', picker: '#000000' });
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
      if (value && color.picker !== value) {
        setColor({ input: value, picker: value });
      }
    }, [color, onColorChange, value]);

    const pickColor = useMemo(
      () =>
        debounce((pickedColor) => {
          if (pickedColor) {
            onColorChange(pickedColor.toLowerCase());
          }
        }, 100),
      [onColorChange]
    );

    const buttons = [
      <MaterialIconButton
        aria-label="Undo"
        key="undo-button"
        className="undo-button"
        color="inherit"
        disabled={!allowUndo}
        onClick={onUndoClick}
      >
        <MaterialIcon>undo</MaterialIcon>
      </MaterialIconButton>,
      <MaterialIconButton
        aria-label="Redo"
        key="redo-button"
        className="redo-button"
        color="inherit"
        disabled={!allowRedo}
        onClick={onRedoClick}
      >
        <MaterialIcon>redo</MaterialIcon>
      </MaterialIconButton>,
    ];

    if (alignment === 'right') {
      buttons.reverse();
    }

    return (
      <div
        className={classNames(
          'color-picker',
          { [`color-picker--${alignment}-aligned`]: alignment },
          className
        )}
      >
        <div className="color-picker__selector">
          <input
            id={id}
            onChange={(event) => {
              pickColor(event.target.value);
            }}
            ref={ref}
            type="color"
            value={color.picker}
          />
          <div
            className="color-picker__preview"
            style={{ backgroundColor: color.picker }}
          />
        </div>
        <MaterialInput
          className={classNames('color-picker__input', 'typography-input', {
            'margin-left-lg': alignment === 'left',
            'margin-right-md': alignment === 'left',
            'margin-right-lg': alignment === 'right',
            'margin-left-md': alignment === 'right',
          })}
          error={hasError}
          onChange={(event) => {
            setColor({ ...color, input: event.target.value });
          }}
          onKeyDown={enterKeyHandler((event) => {
            try {
              new Color(event.target.value.toLowerCase());
              event.target.blur();
            } catch {
              setHasError(true);
            }
          })}
          onBlur={(event) => {
            try {
              const inputColor = new Color(event.target.value.toLowerCase());
              onColorChange(inputColor.hex().toLowerCase());
            } catch {
              setColor({ ...color, input: value });
            }
            setHasError(false);
          }}
          value={color.input}
        />
        <MaterialIconButton
          aria-label="Randomize"
          className="shuffle-button"
          color="inherit"
          onClick={onShuffleClick}
        >
          <MaterialIcon>shuffle</MaterialIcon>
        </MaterialIconButton>
        {buttons}
      </div>
    );
  }
);

ColorPicker.displayName = 'ColorPicker';
ColorPicker.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  alignment: PropTypes.oneOf(['left', 'right']),
  allowRedo: PropTypes.bool,
  allowUndo: PropTypes.bool,
  onColorChange: PropTypes.func,
  onShuffleClick: PropTypes.func,
  onUndoClick: PropTypes.func,
  onRedoClick: PropTypes.func,
  showLabel: PropTypes.bool,
  value: PropTypes.string,
};

export default ColorPicker;
