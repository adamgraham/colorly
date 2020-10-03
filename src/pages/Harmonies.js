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
            />
            {/* <ColorCard color={color.hue(color.hue() + 180)} /> */}
          </ColorGroup>
          <ColorGroup layout="row">
            <ColorPalette
              baseColor={color.hue(color.hue() + 150)}
              length={3}
              type="tintsAndShades"
            />
            <ColorPalette
              baseColor={color.hue(color.hue() + 210)}
              length={3}
              type="tintsAndShades"
            />
            {/* <ColorCard color={color.hue(color.hue() + 150)} />
            <ColorCard color={color.hue(color.hue() + 210)} /> */}
          </ColorGroup>
          <ColorGroup layout="row">
            <ColorPalette
              baseColor={color.hue(color.hue() - 30)}
              length={3}
              type="tintsAndShades"
            />
            <ColorPalette
              baseColor={color.hue(color.hue() + 30)}
              length={3}
              type="tintsAndShades"
            />
            {/* <ColorCard color={color.hue(color.hue() - 30)} />
            <ColorCard color={color.hue(color.hue() + 30)} /> */}
          </ColorGroup>
          <ColorGroup layout="row">
            <ColorPalette
              baseColor={color.hue(color.hue() - 120)}
              length={3}
              type="tintsAndShades"
            />
            <ColorPalette
              baseColor={color.hue(color.hue() + 120)}
              length={3}
              type="tintsAndShades"
            />
            {/* <ColorCard color={color.hue(color.hue() - 120)} />
            <ColorCard color={color.hue(color.hue() + 120)} /> */}
          </ColorGroup>
          <ColorGroup layout="row">
            <ColorPalette
              baseColor={color.hue(color.hue() + 180)}
              length={2}
              type="tintsAndShades"
            />
            <ColorPalette
              baseColor={color.hue(color.hue() + 60)}
              length={2}
              type="tintsAndShades"
            />
            <ColorPalette
              baseColor={color.hue(color.hue() + 240)}
              length={2}
              type="tintsAndShades"
            />
            {/* <ColorCard color={color.hue(color.hue() + 60)} />
            <ColorCard color={color.hue(color.hue() + 180)} />
            <ColorCard color={color.hue(color.hue() + 240)} /> */}
          </ColorGroup>
          <ColorGroup layout="row">
            <ColorPalette
              baseColor={color.hue(color.hue() + 180)}
              length={2}
              type="tintsAndShades"
            />
            <ColorPalette
              baseColor={color.hue(color.hue() + 90)}
              length={2}
              type="tintsAndShades"
            />
            <ColorPalette
              baseColor={color.hue(color.hue() + 270)}
              length={2}
              type="tintsAndShades"
            />
            {/* <ColorCard color={color.hue(color.hue() + 90)} />
            <ColorCard color={color.hue(color.hue() + 180)} />
            <ColorCard color={color.hue(color.hue() + 270)} /> */}
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
