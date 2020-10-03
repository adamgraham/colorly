import React from 'react';
import PropTypes from 'prop-types';
import { ColorCard, ColorGroup, ColorPalette } from '../components';
import { withBaseColor } from '../utils/hoc';
import Color from 'color';

const Harmonies = ({ baseColor, setBaseColor }) => {
  const color = new Color(baseColor);
  return (
    <article className="page harmonies">
      <ColorGroup layout="row">
        <ColorCard color={baseColor} size="large" />
        <ColorGroup layout="column">
          <ColorGroup layout="row">
            <ColorPalette
              baseColor={color.hue(color.hue() + 180)}
              length={6}
              type="tintsAndShades"
              onSelectColor={setBaseColor}
            />
          </ColorGroup>
          <ColorGroup layout="row">
            <ColorPalette
              baseColor={color.hue(color.hue() + 150)}
              length={3}
              type="tintsAndShades"
              onSelectColor={setBaseColor}
            />
            <ColorPalette
              baseColor={color.hue(color.hue() + 210)}
              length={3}
              type="tintsAndShades"
              onSelectColor={setBaseColor}
            />
          </ColorGroup>
          <ColorGroup layout="row">
            <ColorPalette
              baseColor={color.hue(color.hue() - 30)}
              length={3}
              type="tintsAndShades"
              onSelectColor={setBaseColor}
            />
            <ColorPalette
              baseColor={color.hue(color.hue() + 30)}
              length={3}
              type="tintsAndShades"
              onSelectColor={setBaseColor}
            />
          </ColorGroup>
          <ColorGroup layout="row">
            <ColorPalette
              baseColor={color.hue(color.hue() - 120)}
              length={3}
              type="tintsAndShades"
              onSelectColor={setBaseColor}
            />
            <ColorPalette
              baseColor={color.hue(color.hue() + 120)}
              length={3}
              type="tintsAndShades"
              onSelectColor={setBaseColor}
            />
          </ColorGroup>
          <ColorGroup layout="row">
            <ColorPalette
              baseColor={color.hue(color.hue() + 180)}
              length={2}
              type="tintsAndShades"
              onSelectColor={setBaseColor}
            />
            <ColorPalette
              baseColor={color.hue(color.hue() + 60)}
              length={2}
              type="tintsAndShades"
              onSelectColor={setBaseColor}
            />
            <ColorPalette
              baseColor={color.hue(color.hue() + 240)}
              length={2}
              type="tintsAndShades"
              onSelectColor={setBaseColor}
            />
          </ColorGroup>
          <ColorGroup layout="row">
            <ColorPalette
              baseColor={color.hue(color.hue() + 180)}
              length={2}
              type="tintsAndShades"
              onSelectColor={setBaseColor}
            />
            <ColorPalette
              baseColor={color.hue(color.hue() + 90)}
              length={2}
              type="tintsAndShades"
              onSelectColor={setBaseColor}
            />
            <ColorPalette
              baseColor={color.hue(color.hue() + 270)}
              length={2}
              type="tintsAndShades"
              onSelectColor={setBaseColor}
            />
          </ColorGroup>
        </ColorGroup>
      </ColorGroup>
    </article>
  );
};

Harmonies.propTypes = {
  baseColor: PropTypes.string.isRequired,
  setBaseColor: PropTypes.func,
};

export default withBaseColor(Harmonies);
