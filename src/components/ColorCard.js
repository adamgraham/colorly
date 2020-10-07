import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Color from 'color';
import {
  MaterialIcon,
  MaterialIconButton,
  MaterialSnackbar,
  MaterialTooltip,
} from '../components/material';
import { white, black } from '../utils/colors';
import { copyToClipboard, enterKeyHandler } from '../utils/eventHandlers';
import {
  formatCMYK,
  formatHSL,
  formatHSV,
  formatLuminance,
  formatRGB,
} from '../utils/format';
import { withBaseColor } from '../utils/hoc';
import './ColorCard.css';

const ColorCard = ({
  children,
  className,
  color,
  properties = ['rgb', 'cmyk', 'hsl', 'hsv'],
  hideProperties = false,
  copyable = true,
  position = 'top-left',
  size = 'flex',
  textSize = 'medium',
  onSelectColor,
}) => {
  const [copyToastOpen, setCopyToastOpen] = useState(false);
  const [colorData, setColorData] = useState({
    color: new Color(color),
    hex: color,
    light: false,
    dark: false,
  });

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

  const selectColor = (event) => {
    onSelectColor(colorData.hex);

    if (event.target && event.target.blur) {
      event.target.blur();
    }
  };

  return (
    <div
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
          'color-card--selectable': onSelectColor,
        },
        className
      )}
      onClick={onSelectColor && selectColor}
      onKeyDown={onSelectColor && enterKeyHandler(selectColor)}
      role={onSelectColor && 'button'}
      tabIndex={onSelectColor && '0'}
      style={{ backgroundColor: colorData.hex }}
    >
      {!hideProperties && (
        <div
          className="color-card__properties"
          role="button"
          tabIndex="-1"
          onClick={(event) => event.stopPropagation()}
          onKeyDown={enterKeyHandler(() => {})}
        >
          <div
            className={classNames('color-card__primary-properties', {
              'body-9pt': textSize === 'small',
              'body-12pt': textSize === 'medium',
              'body-15pt': textSize === 'large',
            })}
          >
            <div key="hex" className="color-card__hex">
              <span className="hex-string">{colorData.hex}</span>
              {copyable && (
                <>
                  <MaterialTooltip
                    title="Copy to clipboard"
                    placement="right"
                    arrow
                  >
                    <div className="color-card__copy">
                      <MaterialIconButton
                        aria-label="Copy"
                        className="color-card__copy-button"
                        color="inherit"
                        onClick={(event) => {
                          event.stopPropagation();
                          copyToClipboard(colorData.hex.toLowerCase(), () =>
                            setCopyToastOpen(true)
                          );
                        }}
                      >
                        <MaterialIcon fontSize="small">
                          content_copy
                        </MaterialIcon>
                      </MaterialIconButton>
                    </div>
                  </MaterialTooltip>
                  <MaterialSnackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    message={`"${colorData.hex.toLowerCase()}" copied to the clipboard`}
                    open={copyToastOpen}
                    autoHideDuration={3000}
                    onClose={() => setCopyToastOpen(false)}
                    action={
                      <MaterialIconButton
                        aria-label="Close"
                        color="inherit"
                        onClick={() => setCopyToastOpen(false)}
                      >
                        <MaterialIcon>close</MaterialIcon>
                      </MaterialIconButton>
                    }
                  />
                </>
              )}
            </div>
          </div>
          <div
            className={classNames('color-card__secondary-properties', {
              'body-9pt': textSize === 'small' || textSize === 'medium',
              'body-12pt': textSize === 'large',
            })}
          >
            {properties.map((property) => {
              switch (property) {
                case 'hex':
                  return (
                    <div key="hex" className="hex-string">
                      {colorData.hex}
                    </div>
                  );
                case 'rgb':
                  return <div key="rgb">{formatRGB(colorData.color)}</div>;
                case 'cmyk':
                  return <div key="cmyk">{formatCMYK(colorData.color)}</div>;
                case 'hsl':
                  return <div key="hsl">{formatHSL(colorData.color)}</div>;
                case 'hsv':
                  return <div key="hsv">{formatHSV(colorData.color)}</div>;
                case 'luminance':
                  return (
                    <div key="luminance">
                      {formatLuminance(colorData.color)}
                    </div>
                  );
                default:
                  return null;
              }
            })}
          </div>
        </div>
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
  onSelectColor: PropTypes.func,
};

export default withBaseColor(ColorCard);
