import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Color from 'color';
import { ColorCard, ColorGroup } from '../components';
import { MaterialChip, MaterialTooltip } from '../components/material';
import { formatLuminance } from '../utils/format';
import { withBaseColor } from '../utils/hoc';
import './ContrastRatio.css';

const renderLoremIpsum = (color) => (
  <div className="lorem-ipsum" style={{ color }}>
    <p style={{ fontSize: '12pt' }}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec magna
      ornare mi sagittis viverra. Praesent luctus, purus pharetra vulputate
      interdum, lectus metus interdum velit, tincidunt scelerisque mauris dolor
      efficitur justo. Vivamus at orci ac sapien varius tristique. Vivamus
      dictum diam quis neque aliquam auctor. Nam quis consectetur erat. Aenean
      varius velit rhoncus eros bibendum, id pharetra metus ultrices.
      Pellentesque dapibus diam et dolor fringilla lacinia. Nunc vulputate
      suscipit congue.
    </p>
    <p style={{ fontSize: '14pt' }}>
      <b>
        Duis auctor cursus odio vel sollicitudin. Nunc vitae tempor nibh.
        Aliquam venenatis venenatis fermentum. Nullam et purus egestas, lacinia
        lorem eu, eleifend massa. Vestibulum vitae eros ac leo tempus
        vestibulum. Vestibulum efficitur, lorem in feugiat efficitur, neque odio
        maximus nibh, ac varius risus ligula eget purus. Cras iaculis neque
        tincidunt diam euismod finibus. Sed sollicitudin quam purus, quis
        consectetur nunc efficitur ac.
      </b>
    </p>
    <p style={{ fontSize: '18pt' }}>
      Suspendisse eget feugiat enim. Ut pellentesque condimentum purus non
      ullamcorper. Curabitur vehicula magna odio, at molestie nibh lacinia ac.
      Suspendisse potenti. Aenean sit amet sodales mi, vel aliquet sapien. Donec
      elementum sagittis augue eget tempus. Nam ultricies felis odio. Nullam
      sapien quam, porta id lacus ac, ullamcorper varius lacus.
    </p>
  </div>
);

const ContrastRatio = ({ baseColor, secondaryBaseColor }) => {
  const _baseColor = new Color(baseColor);
  const _secondaryColor = new Color(secondaryBaseColor);
  const contrast = _baseColor.contrast(_secondaryColor);
  const level = _baseColor.level(_secondaryColor);
  return (
    <div className="page contrast-ratio">
      <ColorGroup layout="column">
        <div className="contrast-ratio__header">
          <span className="body-12pt text-align-left margin-left-sm">
            {formatLuminance(_baseColor)}
          </span>
          <MaterialTooltip
            title={
              level !== ''
                ? `Meets WCAG 2.1 ${level} Compliance`
                : 'Fails WCAG 2.1 Compliance'
            }
          >
            <span
              className={classNames(
                'contrast-ratio__contrast',
                'text-align-center',
                {
                  [level !== '' ? level : 'fails']: true,
                }
              )}
            >
              <span className="contrast-ratio__ratio">
                {contrast.toFixed(2)}
              </span>
              <MaterialChip
                className="margin-left-md"
                color={level !== '' ? 'primary' : 'secondary'}
                label={level !== '' ? level : 'Fails'}
                clickable
                component="a"
                href={
                  level === 'AAA'
                    ? 'https://www.w3.org/TR/WCAG21/#contrast-enhanced'
                    : 'https://www.w3.org/TR/WCAG21/#contrast-minimum'
                }
                target="_blank"
                rel="noopener noreferrer"
              />
            </span>
          </MaterialTooltip>
          <span className="body-12pt text-align-right margin-right-sm">
            {formatLuminance(_secondaryColor)}
          </span>
        </div>
        <ColorGroup layout="row">
          <ColorCard
            color={baseColor}
            copyable={false}
            position="top-left"
            properties={['luminance']}
            secondaryProperties={[]}
            hideProperties
            text="large"
          >
            {renderLoremIpsum(secondaryBaseColor)}
          </ColorCard>
          <ColorCard
            color={secondaryBaseColor}
            copyable={false}
            position="top-right"
            properties={['luminance']}
            secondaryProperties={[]}
            hideProperties
            text="large"
          >
            {renderLoremIpsum(baseColor)}
          </ColorCard>
        </ColorGroup>
      </ColorGroup>
    </div>
  );
};

ContrastRatio.propTypes = {
  baseColor: PropTypes.string,
  secondaryBaseColor: PropTypes.string,
};

export default withBaseColor(ContrastRatio);
