import React from 'react';
import PropTypes from 'prop-types';
import { ColorCard, ColorGroup, ColorPalette } from '../components';
import { withBaseColor } from '../utils/hoc';

const Lightness = ({ baseColor, setBaseColor }) => (
  <article className="page lightness">
    <ColorGroup layout="row">
      <ColorCard color={baseColor} onSelectColor={setBaseColor} size="large" />
      <ColorGroup layout="column">
        <ColorPalette
          baseColor={baseColor}
          onSelectColor={setBaseColor}
          type="lighten"
        />
        <ColorPalette
          baseColor={baseColor}
          onSelectColor={setBaseColor}
          type="darken"
        />
      </ColorGroup>
    </ColorGroup>
  </article>
);

Lightness.propTypes = {
  baseColor: PropTypes.string,
  setBaseColor: PropTypes.func,
};

export default withBaseColor(Lightness);
