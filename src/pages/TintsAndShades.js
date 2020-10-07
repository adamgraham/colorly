import React from 'react';
import PropTypes from 'prop-types';
import { ColorCard, ColorGroup, ColorPalette } from '../components';
import { withBaseColor } from '../utils/hoc';

const TintsAndShades = ({ baseColor, setBaseColor }) => (
  <article className="page tints-and-shades">
    <ColorGroup layout="row">
      <ColorCard color={baseColor} onSelectColor={setBaseColor} size="large" />
      <ColorGroup layout="column">
        <ColorPalette
          baseColor={baseColor}
          onSelectColor={setBaseColor}
          type="tints"
        />
        <ColorPalette
          baseColor={baseColor}
          onSelectColor={setBaseColor}
          type="shades"
        />
        <ColorPalette
          baseColor={baseColor}
          onSelectColor={setBaseColor}
          type="tones"
        />
      </ColorGroup>
    </ColorGroup>
  </article>
);

TintsAndShades.propTypes = {
  baseColor: PropTypes.string,
  setBaseColor: PropTypes.func,
};

export default withBaseColor(TintsAndShades);
