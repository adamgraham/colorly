import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Color from 'color';
import blinder from 'color-blind';
import { setSelectedColorBlindness } from '../actions';
import { ColorGroup, ColorPalette, PageHeader } from '../components';
import {
  MaterialButton,
  MaterialIcon,
  MaterialMenu,
  MaterialMenuItem,
} from '../components/material';
import { getSelectedColorBlindness } from '../selectors';
import { withBaseColor } from '../utils/hoc';

const routes = {
  protanopia: {
    path: '/color-blindness/protanopia',
    name: 'Protanopia',
    blinder: 'protanopia',
  },
  protanomaly: {
    path: '/color-blindness/protanomaly',
    name: 'Protanomaly',
    blinder: 'protanomaly',
  },
  deuteranopia: {
    path: '/color-blindness/deuteranopia',
    name: 'Deuteranopia',
    blinder: 'deuteranopia',
  },
  deuteranomaly: {
    path: '/color-blindness/deuteranomaly',
    name: 'Deuteranomaly',
    blinder: 'deuteranomaly',
  },
  tritanopia: {
    path: '/color-blindness/tritanopia',
    name: 'Tritanopia',
    blinder: 'tritanopia',
  },
  tritanomaly: {
    path: '/color-blindness/tritanomaly',
    name: 'Tritanomaly',
    blinder: 'tritanomaly',
  },
  achromatopsia: {
    path: '/color-blindness/achromatopsia',
    name: 'Achromatopsia',
    blinder: 'achromatopsia',
  },
  achromatomaly: {
    path: '/color-blindness/achromatomaly',
    name: 'Achromatomaly',
    blinder: 'achromatomaly',
  },
};

const ColorBlindness = ({ baseColor, setBaseColor, history }) => {
  const color = new Color(baseColor);
  const dispatch = useDispatch();
  const selectedColorBlindness = useSelector(getSelectedColorBlindness);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const matchedRoute = Object.values(routes).find((route) => {
    return history.location.pathname.includes(route.path);
  });

  useEffect(() => {
    if (!matchedRoute) {
      history.push(selectedColorBlindness?.path ?? routes.protanopia.path);
    }
  }, [history, selectedColorBlindness, matchedRoute]);

  const openMenu = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const closeMenu = () => {
    setMenuAnchor(null);
  };

  return (
    <article className="page color-blindness">
      <PageHeader layout="center">
        <MaterialButton
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={openMenu}
          startIcon={
            <MaterialIcon>
              {menuAnchor ? 'expand_less' : 'expand_more'}
            </MaterialIcon>
          }
        >
          <b className="page-header__title typography-page-title">
            {(matchedRoute && matchedRoute.name) || 'Select a color blindness'}
          </b>
        </MaterialButton>
        <MaterialMenu
          id="color-blindness-select"
          className="margin-top-xxxl"
          anchorEl={menuAnchor}
          keepMounted
          open={Boolean(menuAnchor)}
          onClose={closeMenu}
        >
          {Object.values(routes).map((route) => (
            <MaterialMenuItem
              key={route.path}
              onClick={() => {
                closeMenu();
                dispatch(setSelectedColorBlindness(route));
                history.push(route.path);
              }}
            >
              <span className="typography-menu">{route.name}</span>
            </MaterialMenuItem>
          ))}
        </MaterialMenu>
      </PageHeader>
      <Switch>
        {Object.values(routes).map((route) => (
          <Route key={route.path} path={route.path}>
            <ColorGroup layout="column">
              <ColorPalette
                baseColor={color}
                length={9}
                type="tintsAndShades"
                onSelectColor={setBaseColor}
              />
              <ColorPalette
                baseColor={blinder[route.blinder](color.hex())}
                length={9}
                type="tintsAndShades"
                onSelectColor={setBaseColor}
              />
            </ColorGroup>
          </Route>
        ))}
      </Switch>
    </article>
  );
};

ColorBlindness.propTypes = {
  baseColor: PropTypes.string,
  setBaseColor: PropTypes.func,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    push: PropTypes.func,
  }),
};

export default withBaseColor(withRouter(ColorBlindness));
