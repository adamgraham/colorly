import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  MaterialButton,
  MaterialIcon,
  MaterialMenu,
  MaterialMenuItem,
} from './material';
import ColorPicker from './ColorPicker';
import { routes } from '../routes';
import { randomColorHex } from '../utils/colors';
import { withBaseColor } from '../utils/hoc';
import './AppHeader.css';

const AppHeader = ({
  baseColor,
  secondaryBaseColor,
  setBaseColor,
  setSecondaryBaseColor,
  history,
}) => {
  const [pageMenuAnchor, setPageMenuAnchor] = useState(null);
  const matchedRoute = Object.values(routes).find((route) => {
    if (route.exact) {
      return history.location.pathname === route.path;
    } else {
      return history.location.pathname.includes(route.path);
    }
  });

  const openPageMenu = (event) => {
    setPageMenuAnchor(event.currentTarget);
  };

  const closePageMenu = () => {
    setPageMenuAnchor(null);
  };

  return (
    <header
      className={classNames('app-header', {
        'app-header--no-shadow': Boolean(
          matchedRoute && matchedRoute.useSubheader
        ),
      })}
    >
      <ColorPicker
        id="color-picker-primary"
        alignment="left"
        onColorChange={setBaseColor}
        onShuffleClick={() => setBaseColor(randomColorHex())}
        showLabel
        value={baseColor}
      />
      <div className="flex justify-content-center align-items-center">
        <MaterialButton
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={openPageMenu}
          startIcon={<MaterialIcon>menu</MaterialIcon>}
        >
          <b className="app-header__title">
            {(matchedRoute && matchedRoute.name) || 'Color Tools'}
          </b>
        </MaterialButton>
        <MaterialMenu
          id="page-select"
          className="margin-top-xxxl"
          anchorEl={pageMenuAnchor}
          keepMounted
          open={Boolean(pageMenuAnchor)}
          onClose={closePageMenu}
        >
          {Object.values(routes).map((route) => (
            <MaterialMenuItem
              key={route.path}
              onClick={() => {
                closePageMenu();
                history.push(route.path);
              }}
            >
              <span className="body-12pt">{route.name}</span>
            </MaterialMenuItem>
          ))}
        </MaterialMenu>
      </div>
      {matchedRoute && matchedRoute.useSecondaryColor ? (
        <ColorPicker
          id="color-picker-secondary"
          alignment="right"
          onColorChange={setSecondaryBaseColor}
          onShuffleClick={() => setSecondaryBaseColor(randomColorHex())}
          showLabel
          value={secondaryBaseColor}
        />
      ) : (
        <div className="body-9pt text-align-right">
          Made with{' '}
          <span aria-label="love" role="img">
            ❤️
          </span>{' '}
          by&nbsp;
          <a
            href="https://www.adamgraham.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Adam Graham
          </a>
        </div>
      )}
    </header>
  );
};

AppHeader.propTypes = {
  baseColor: PropTypes.string,
  secondaryBaseColor: PropTypes.string,
  setBaseColor: PropTypes.func,
  setSecondaryBaseColor: PropTypes.func,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    push: PropTypes.func,
  }),
};

export default withBaseColor(withRouter(AppHeader));
