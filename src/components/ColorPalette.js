import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Color from 'color';
import ColorCard from './ColorCard';
import { white, black, gray } from '../utils/colors';
import './ColorPalette.css';

const types = {
  hues: 'hues',
  tintsAndShades: 'tintsAndShades',
  tints: 'tints',
  shades: 'shades',
  tones: 'tones',
  lighten: 'lighten',
  darken: 'darken',
  saturated: 'saturated',
  desaturated: 'desaturated',
};

const ColorPalette = ({
  className,
  type,
  baseColor,
  length = 10,
  increment = 0.1,
  includeBaseColor = false,
  reversed = false,
  layout = 'row',
  onSelectColor = () => {},
}) => {
  const [palette, setPalette] = useState([]);

  useEffect(() => {
    const base = new Color(baseColor);
    const colors = includeBaseColor ? [base.hex()] : [];
    const lightness = base.lightness();
    const saturation = base.saturationl();

    for (let i = 0; i < length; i++) {
      const weight = (i + 1) * increment;
      let color = base;

      switch (type) {
        case types.hues:
          color = color.rotate(weight * 360);
          break;
        case types.tintsAndShades:
          if (i < length / 2) {
            color = color.mix(white, 0.5 - weight);
          } else {
            color = color.mix(black, weight - 0.5);
          }
          break;
        case types.tints:
          color = color.mix(white, weight);
          break;
        case types.shades:
          color = color.mix(black, weight);
          break;
        case types.tones:
          color = color.mix(gray, weight);
          break;
        case types.lighten:
          color = color.lightness(lightness + weight * (100 - lightness));
          break;
        case types.darken:
          color = color.lightness(color.lightness() * (1 - weight));
          break;
        case types.saturated:
          color = color.saturationl(saturation + weight * (100 - saturation));
          break;
        case types.desaturated:
          color = color.saturationl(color.saturationl() * (1 - weight));
          break;
        default:
          break;
      }

      colors.push(color.hex());
    }

    if (reversed) {
      setPalette(colors.reverse());
    } else {
      setPalette(colors);
    }
  }, [baseColor, includeBaseColor, increment, length, reversed, type]);

  return (
    <div
      className={classNames(
        'color-palette',
        { [`color-palette--${layout}`]: layout },
        type,
        className
      )}
    >
      {palette.map((color, index) => (
        <ColorCard
          key={index}
          color={color}
          size="flex"
          onSelectColor={onSelectColor}
        />
      ))}
    </div>
  );
};

ColorPalette.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(Object.values(types)).isRequired,
  baseColor: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
  length: PropTypes.number,
  increment: PropTypes.number,
  includeBaseColor: PropTypes.bool,
  reversed: PropTypes.bool,
  layout: PropTypes.oneOf(['row', 'row-reverse', 'column', 'column-reverse']),
  onSelectColor: PropTypes.func,
};

ColorPalette.types = types;

export default ColorPalette;
