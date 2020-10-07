import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import { MaterialIcon, MaterialIconButton } from '../components/material';
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
      showLabel = false,
      value,
    },
    ref
  ) => {
    const [color, setColor] = useState('#000000');

    useEffect(() => {
      if (value && value !== color) {
        setColor(value);
      }
    }, [value, color, ref]);

    const changeColor = useMemo(
      () =>
        debounce((pickedColor) => {
          onColorChange(pickedColor);
          setColor(pickedColor);
        }, 100),
      [onColorChange]
    );

    const handleChange = (event) => {
      const { value } = event.currentTarget;
      changeColor(value);
    };

    return (
      <div
        className={classNames(
          'color-picker',
          { [`color-picker--${alignment}-aligned`]: alignment },
          className
        )}
      >
        <input
          id={id}
          onChange={handleChange}
          ref={ref}
          type="color"
          value={color}
        />
        {showLabel && (
          <label htmlFor={id} className="hex-string body-15pt margin-left-md">
            {color}
          </label>
        )}
        <MaterialIconButton
          aria-label="Randomize"
          className="shuffle-button"
          color="inherit"
          onClick={onShuffleClick}
        >
          <MaterialIcon>shuffle</MaterialIcon>
        </MaterialIconButton>
        {alignment === 'left' && (
          <>
            <MaterialIconButton
              aria-label="Undo"
              className="undo-button"
              color="inherit"
              disabled={!allowUndo}
              onClick={onUndoClick}
            >
              <MaterialIcon>undo</MaterialIcon>
            </MaterialIconButton>
            <MaterialIconButton
              aria-label="Redo"
              className="redo-button"
              color="inherit"
              disabled={!allowRedo}
              onClick={onRedoClick}
            >
              <MaterialIcon>redo</MaterialIcon>
            </MaterialIconButton>
          </>
        )}
        {alignment === 'right' && (
          <>
            <MaterialIconButton
              aria-label="Redo"
              className="redo-button"
              color="inherit"
              disabled={!allowRedo}
              onClick={onRedoClick}
            >
              <MaterialIcon>redo</MaterialIcon>
            </MaterialIconButton>
            <MaterialIconButton
              aria-label="Undo"
              className="undo-button"
              color="inherit"
              disabled={!allowUndo}
              onClick={onUndoClick}
            >
              <MaterialIcon>undo</MaterialIcon>
            </MaterialIconButton>
          </>
        )}
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
