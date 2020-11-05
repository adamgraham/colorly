import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  MaterialButton,
  MaterialIcon,
  MaterialMenu,
  MaterialMenuItem,
} from './material';
import AboutDialog from './AboutDialog';
import ColorPicker from './ColorPicker';
import {
  redoBaseColor,
  redoSecondaryBaseColor,
  shuffleBaseColor,
  shuffleSecondaryBaseColor,
  undoBaseColor,
  undoSecondaryBaseColor,
} from '../actions';
import { routes } from '../routes';
import {
  canRedoBaseColor,
  canRedoSecondaryBaseColor,
  canUndoBaseColor,
  canUndoSecondaryBaseColor,
} from '../selectors';
import { isValidColor } from '../utils/colors';
import { withBaseColor } from '../utils/hoc';
import './AppHeader.css';

const AppHeader = ({
  baseColor,
  secondaryBaseColor,
  setBaseColor,
  setSecondaryBaseColor,
  history,
}) => {
  const dispatch = useDispatch();
  const _canRedoBaseColor = useSelector(canRedoBaseColor);
  const _canRedoSecondaryBaseColor = useSelector(canRedoSecondaryBaseColor);
  const _canUndoBaseColor = useSelector(canUndoBaseColor);
  const _canUndoSecondaryBaseColor = useSelector(canUndoSecondaryBaseColor);

  const [pageMenuAnchor, setPageMenuAnchor] = useState(null);
  const matchedRoute = Object.values(routes).find((route) => {
    if (route.exact) {
      return history.location.pathname === route.path;
    } else {
      return history.location.pathname.includes(route.path);
    }
  });

  useEffect(() => {
    if (!matchedRoute) {
      history.push(routes.tintsAndShades.path);
    }
  }, [matchedRoute, history]);

  useEffect(() => {
    document.addEventListener('paste', (event) => {
      let paste = (event.clipboardData || window.clipboardData).getData('text');
      if (isValidColor(paste)) {
        setBaseColor(paste);
      }
    });
  }, [setBaseColor]);

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
        allowRedo={_canRedoBaseColor}
        allowUndo={_canUndoBaseColor}
        onColorChange={setBaseColor}
        onShuffleClick={() => dispatch(shuffleBaseColor())}
        onUndoClick={() => dispatch(undoBaseColor())}
        onRedoClick={() => dispatch(redoBaseColor())}
        value={baseColor}
      />
      <div className="flex justify-content-center align-items-center">
        <MaterialButton
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={openPageMenu}
          startIcon={<MaterialIcon>menu</MaterialIcon>}
        >
          <b className="app-header__title typography-app-title">
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
              <span className="typography-menu">{route.name}</span>
            </MaterialMenuItem>
          ))}
        </MaterialMenu>
      </div>
      {matchedRoute && matchedRoute.useSecondaryColor ? (
        <ColorPicker
          id="color-picker-secondary"
          alignment="right"
          allowRedo={_canRedoSecondaryBaseColor}
          allowUndo={_canUndoSecondaryBaseColor}
          onColorChange={setSecondaryBaseColor}
          onShuffleClick={() => dispatch(shuffleSecondaryBaseColor())}
          onUndoClick={() => dispatch(undoSecondaryBaseColor())}
          onRedoClick={() => dispatch(redoSecondaryBaseColor())}
          value={secondaryBaseColor}
        />
      ) : (
        <AboutDialog />
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
