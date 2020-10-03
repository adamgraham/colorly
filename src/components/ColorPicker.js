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
      onColorChange = () => {},
      onShuffleClick = () => {},
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
          // component="span"
          fontSize="small"
          onClick={onShuffleClick}
        >
          <MaterialIcon>shuffle</MaterialIcon>
        </MaterialIconButton>
      </div>
    );
  }
);

ColorPicker.displayName = 'ColorPicker';
ColorPicker.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  alignment: PropTypes.oneOf(['left', 'right']),
  onColorChange: PropTypes.func,
  onShuffleClick: PropTypes.func,
  showLabel: PropTypes.bool,
  value: PropTypes.string,
};

export default ColorPicker;
