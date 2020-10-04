import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Color from 'color';
import {
  MaterialIcon,
  MaterialSnackbar,
  MaterialTooltip,
} from '../components/material';
import { white, black } from '../utils/colors';
import { enterKeyHandler } from '../utils/eventHandlers';
import {
  formatCMYK,
  formatHSL,
  formatLuminance,
  formatRGB,
} from '../utils/format';
import { withBaseColor } from '../utils/hoc';
import './ColorCard.css';

const renderProperties = (properties, colorData) => (
  <>
    {properties.map((property) => {
      switch (property) {
        case 'hex':
          return (
            <div key="hex" className="color-card__hex">
              <span className="hex-string">{colorData.hex}</span>
              <MaterialIcon className="color-card__copy">
                content_copy
              </MaterialIcon>
            </div>
          );
        case 'rgb':
          return <div key="rgb">{formatRGB(colorData.color)}</div>;
        case 'cmyk':
          return <div key="cmyk">{formatCMYK(colorData.color)}</div>;
        case 'hsl':
          return <div key="hsl">{formatHSL(colorData.color)}</div>;
        case 'luminance':
          return <div key="luminance">{formatLuminance(colorData.color)}</div>;
        default:
          return null;
      }
    })}
  </>
);

const ColorCard = ({
  children,
  className,
  color,
  properties = ['hex'],
  secondaryProperties = ['rgb', 'cmyk', 'hsl'],
  hideProperties = false,
  copyable = true,
  position = 'top-left',
  size = 'flex',
  textSize = 'medium',
  onSelect,
}) => {
  const [copyToastOpen, setCopyToastOpen] = useState(false);
  const [colorData, setColorData] = useState({
    color: new Color(color),
    hex: color,
    light: false,
    dark: false,
  });

  const copyToClipboard = (str) => {
    const element = document.createElement('textarea');
    element.value = str;
    element.setAttribute('readonly', '');
    element.style.position = 'absolute';
    element.style.left = '-9999px';
    document.body.appendChild(element);
    element.select();
    document.execCommand('copy');
    document.body.removeChild(element);
    setCopyToastOpen(true);
  };

  useEffect(() => {
    const _color = new Color(color);
    const whiteContrast = _color.contrast(white);
    const blackContrast = _color.contrast(black);

    setColorData({
      color: _color,
      hex: _color.hex(),
      light: blackContrast >= whiteContrast,
      dark: whiteContrast > blackContrast,
    });
  }, [color]);

  return (
    <div
      style={{ backgroundColor: colorData.hex }}
      className={classNames(
        'color-card',
        {
          'color-card--light': colorData.light,
          'color-card--dark': colorData.dark,
        },
        {
          [`color-card--${position}`]: position,
          [`color-card--${size}`]: size,
        },
        {
          'color-card--selectable': onSelect,
        },
        className
      )}
      onClick={onSelect && (() => onSelect(colorData.hex))}
      onKeyDown={onSelect && enterKeyHandler(() => onSelect(colorData.hex))}
      role={onSelect && 'button'}
      tabIndex={onSelect && '-1'}
    >
      {!hideProperties && (
        <>
          {copyable ? (
            <>
              <MaterialTooltip title="Copy to clipboard">
                <div
                  className="color-card__properties"
                  onClick={(event) => {
                    event.stopPropagation();
                    copyToClipboard(colorData.hex.toLowerCase());
                  }}
                  onKeyDown={enterKeyHandler(() =>
                    copyToClipboard(colorData.hex.toLowerCase())
                  )}
                  role="button"
                  tabIndex="-1"
                >
                  <div
                    className={classNames('color-card__primary-properties', {
                      'body-9pt': textSize === 'small',
                      'body-12pt': textSize === 'medium',
                      'body-15pt': textSize === 'large',
                    })}
                  >
                    {renderProperties(properties, colorData)}
                  </div>
                  <div
                    className={classNames('color-card__secondary-properties', {
                      'body-9pt': textSize === 'small' || textSize === 'medium',
                      'body-12pt': textSize === 'large',
                    })}
                  >
                    {renderProperties(secondaryProperties, colorData)}
                  </div>
                </div>
              </MaterialTooltip>
              <MaterialSnackbar
                message={`Copied '${colorData.hex.toLowerCase()}' to the clipboard`}
                open={copyToastOpen}
                autoHideDuration={3000}
                onClose={() => setCopyToastOpen(false)}
              />
            </>
          ) : (
            <div className="color-card__properties">
              <div
                className={classNames('color-card__primary-properties', {
                  'body-9pt': textSize === 'small',
                  'body-12pt': textSize === 'medium',
                  'body-15pt': textSize === 'large',
                })}
              >
                {renderProperties(properties, colorData)}
              </div>
              <div
                className={classNames('color-card__secondary-properties', {
                  'body-9pt': textSize === 'small' || textSize === 'medium',
                  'body-12pt': textSize === 'large',
                })}
              >
                {renderProperties(secondaryProperties, colorData)}
              </div>
            </div>
          )}
        </>
      )}
      {children}
    </div>
  );
};

ColorCard.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  baseColor: PropTypes.string,
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  properties: PropTypes.arrayOf(
    PropTypes.oneOf(['hex', 'rgb', 'cmyk', 'hsl', 'luminance'])
  ),
  secondaryProperties: PropTypes.arrayOf(
    PropTypes.oneOf(['hex', 'rgb', 'cmyk', 'hsl', 'luminance'])
  ),
  hideProperties: PropTypes.bool,
  copyable: PropTypes.bool,
  position: PropTypes.oneOf([
    'top-left',
    'top-right',
    'bottom-left',
    'bottom-right',
  ]),
  size: PropTypes.oneOf(['small', 'medium', 'large', 'flex']),
  textSize: PropTypes.oneOf(['small', 'medium', 'large']),
  onSelect: PropTypes.func,
};

export default withBaseColor(ColorCard);
