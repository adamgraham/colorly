import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Color from 'color';
import { ColorGroup, ColorPalette, PageHeader } from '../components';
import {
  MaterialButton,
  MaterialIcon,
  MaterialMenu,
  MaterialMenuItem,
} from '../components/material';
import { withBaseColor } from '../utils/hoc';
import './Harmonies.css';

const routes = {
  analogous: {
    path: '/harmonies/analogous',
    name: 'Analogous',
    hues: [-30, 0, 30],
  },
  monochromatic: {
    path: '/harmonies/monochromatic',
    name: 'Monochromatic',
    hues: [0],
  },
  complement: {
    path: '/harmonies/complement',
    name: 'Complement',
    hues: [0, 180],
  },
  splitComplement: {
    path: '/harmonies/split-complement',
    name: 'Split Complement',
    hues: [0, 150, 210],
  },
  doubleComplement: {
    path: '/harmonies/double-complement',
    name: 'Double Complement',
    hues: [-30, 150, 30, 210],
  },
  triadic: {
    path: '/harmonies/triadic',
    name: 'Triadic (120°)',
    hues: [0, 120, 240],
  },
  tetradic: {
    path: '/harmonies/tetradic',
    name: 'Tetradic (90°)',
    hues: [0, 90, 180, 270],
  },
};

const Harmonies = ({ baseColor, setBaseColor, history }) => {
  const dispatch = useDispatch();
  const selectedHarmony = useSelector((state) => state.color.selectedHarmony);
  const color = new Color(baseColor);
  const [harmonyMenuAnchor, setHarmonyMenuAnchor] = useState(null);
  const matchedRoute = Object.values(routes).find((route) => {
    return history.location.pathname.includes(route.path);
  });

  useEffect(() => {
    if (!matchedRoute) {
      history.push(selectedHarmony?.path ?? routes.analogous.path);
    }
  }, [history, selectedHarmony, matchedRoute]);

  const openHarmonyMenu = (event) => {
    setHarmonyMenuAnchor(event.currentTarget);
  };

  const closeHarmonyMenu = () => {
    setHarmonyMenuAnchor(null);
  };

  return (
    <article className="page harmonies">
      <PageHeader layout="center">
        <MaterialButton
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={openHarmonyMenu}
          startIcon={
            <MaterialIcon>
              {harmonyMenuAnchor ? 'expand_less' : 'expand_more'}
            </MaterialIcon>
          }
        >
          <b className="page-header__title">
            {(matchedRoute && matchedRoute.name) || 'Select a harmony'}
          </b>
        </MaterialButton>
        <MaterialMenu
          id="harmony-select"
          className="margin-top-xxxl"
          anchorEl={harmonyMenuAnchor}
          keepMounted
          open={Boolean(harmonyMenuAnchor)}
          onClose={closeHarmonyMenu}
        >
          {Object.values(routes).map((route) => (
            <MaterialMenuItem
              key={route.path}
              onClick={() => {
                closeHarmonyMenu();
                dispatch({ type: 'SET_SELECTED_HARMONY', harmony: route });
                history.push(route.path);
              }}
            >
              <span className="body-12pt">{route.name}</span>
            </MaterialMenuItem>
          ))}
        </MaterialMenu>
      </PageHeader>
      <Switch>
        {Object.values(routes).map((route) => (
          <Route key={route.path} path={route.path}>
            <ColorGroup layout="column">
              {route.hues.map((hue) => (
                <ColorPalette
                  key={hue}
                  baseColor={hue === 0 ? color : color.hue(color.hue() + hue)}
                  length={9}
                  type="tintsAndShades"
                  onSelectColor={setBaseColor}
                />
              ))}
            </ColorGroup>
          </Route>
        ))}
      </Switch>
    </article>
  );
};

Harmonies.propTypes = {
  baseColor: PropTypes.string.isRequired,
  setBaseColor: PropTypes.func,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    push: PropTypes.func,
  }),
};

export default withBaseColor(withRouter(Harmonies));
