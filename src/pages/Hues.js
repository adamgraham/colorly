import React from 'react';
import PropTypes from 'prop-types';
import Color from 'color';
import { ColorCard, ColorGroup, ColorPalette } from '../components';
import { withBaseColor } from '../utils/hoc';

const Hues = ({ baseColor, setBaseColor }) => {
  const color = new Color(baseColor);
  return (
    <article className="page lightness">
      <ColorGroup layout="row">
        <ColorCard color={baseColor} size="large" />
        <ColorGroup layout="column">
          <ColorPalette
            baseColor={baseColor}
            onSelectColor={setBaseColor}
            increment={15 / 360}
            length={8}
            type="hues"
          />
          <ColorPalette
            baseColor={color.hue(color.hue() + 120)}
            onSelectColor={setBaseColor}
            increment={15 / 360}
            length={8}
            type="hues"
          />
          <ColorPalette
            baseColor={color.hue(color.hue() + 240)}
            onSelectColor={setBaseColor}
            increment={15 / 360}
            length={8}
            type="hues"
          />
        </ColorGroup>
      </ColorGroup>
    </article>
  );
};

Hues.propTypes = {
  baseColor: PropTypes.string.isRequired,
  setBaseColor: PropTypes.func,
};

export default withBaseColor(Hues);
