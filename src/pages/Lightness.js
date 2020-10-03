import React from 'react';
import PropTypes from 'prop-types';
import { ColorCard, ColorGroup, ColorPalette } from '../components';
import { withBaseColor } from '../utils/hoc';

const Lightness = ({ baseColor, setBaseColor }) => (
  <div className="page lightness">
    <ColorGroup layout="row">
      <ColorCard color={baseColor} size="large" />
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
  </div>
);

Lightness.propTypes = {
  baseColor: PropTypes.string.isRequired,
  setBaseColor: PropTypes.func,
};

export default withBaseColor(Lightness);
