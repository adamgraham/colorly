import React, { useEffect, useState } from 'react';
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
  complement: {
    path: '/harmonies/complement',
    name: 'Complement',
  },
  splitComplement: {
    path: '/harmonies/split-complement',
    name: 'Split Complement',
  },
  analogous: {
    path: '/harmonies/analogous',
    name: 'Analogous',
  },
  triadic: {
    path: '/harmonies/triadic',
    name: 'Triadic',
  },
  rectangle: {
    path: '/harmonies/rectangle',
    name: 'Rectangle',
  },
  square: {
    path: '/harmonies/square',
    name: 'Square',
  },
};

const Harmonies = ({ baseColor, setBaseColor, history }) => {
  const color = new Color(baseColor);
  const [harmonyMenuAnchor, setHarmonyMenuAnchor] = useState(null);
  const matchedRoute = Object.values(routes).find((route) => {
    return history.location.pathname.includes(route.path);
  });

  useEffect(() => {
    if (!matchedRoute) {
      history.push(routes.complement.path);
    }
  }, [matchedRoute, history]);

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
                history.push(route.path);
              }}
            >
              <span className="body-12pt">{route.name}</span>
            </MaterialMenuItem>
          ))}
        </MaterialMenu>
      </PageHeader>
      <Switch>
        <Route path={routes.complement.path}>
          <ColorGroup layout="column">
            <ColorPalette
              baseColor={color}
              length={9}
              type="tintsAndShades"
              onSelectColor={setBaseColor}
            />
            <ColorPalette
              baseColor={color.hue(color.hue() + 180)}
              length={9}
              type="tintsAndShades"
              onSelectColor={setBaseColor}
            />
          </ColorGroup>
        </Route>
        <Route path={routes.splitComplement.path}>
          <ColorGroup layout="column">
            <ColorPalette
              baseColor={color}
              length={9}
              type="tintsAndShades"
              onSelectColor={setBaseColor}
            />
            <ColorPalette
              baseColor={color.hue(color.hue() + 150)}
              length={9}
              type="tintsAndShades"
              onSelectColor={setBaseColor}
            />
            <ColorPalette
              baseColor={color.hue(color.hue() + 210)}
              length={9}
              type="tintsAndShades"
              onSelectColor={setBaseColor}
            />
          </ColorGroup>
        </Route>
        <Route path={routes.analogous.path}>
          <ColorGroup layout="column">
            <ColorPalette
              baseColor={color}
              length={9}
              type="tintsAndShades"
              onSelectColor={setBaseColor}
            />
            <ColorPalette
              baseColor={color.hue(color.hue() - 30)}
              length={9}
              type="tintsAndShades"
              onSelectColor={setBaseColor}
            />
            <ColorPalette
              baseColor={color.hue(color.hue() + 30)}
              length={9}
              type="tintsAndShades"
              onSelectColor={setBaseColor}
            />
          </ColorGroup>
        </Route>
        <Route path={routes.triadic.path}>
          <ColorGroup layout="column">
            <ColorPalette
              baseColor={color}
              length={9}
              type="tintsAndShades"
              onSelectColor={setBaseColor}
            />
            <ColorPalette
              baseColor={color.hue(color.hue() - 120)}
              length={9}
              type="tintsAndShades"
              onSelectColor={setBaseColor}
            />
            <ColorPalette
              baseColor={color.hue(color.hue() + 120)}
              length={9}
              type="tintsAndShades"
              onSelectColor={setBaseColor}
            />
          </ColorGroup>
        </Route>
        <Route path={routes.rectangle.path}>
          <ColorGroup layout="column">
            <ColorPalette
              baseColor={color}
              length={9}
              type="tintsAndShades"
              onSelectColor={setBaseColor}
            />
            <ColorPalette
              baseColor={color.hue(color.hue() + 180)}
              length={9}
              type="tintsAndShades"
              onSelectColor={setBaseColor}
            />
            <ColorPalette
              baseColor={color.hue(color.hue() + 60)}
              length={9}
              type="tintsAndShades"
              onSelectColor={setBaseColor}
            />
            <ColorPalette
              baseColor={color.hue(color.hue() + 240)}
              length={9}
              type="tintsAndShades"
              onSelectColor={setBaseColor}
            />
          </ColorGroup>
        </Route>
        <Route path={routes.square.path}>
          <ColorGroup layout="column">
            <ColorPalette
              baseColor={color}
              length={9}
              type="tintsAndShades"
              onSelectColor={setBaseColor}
            />
            <ColorPalette
              baseColor={color.hue(color.hue() + 180)}
              length={9}
              type="tintsAndShades"
              onSelectColor={setBaseColor}
            />
            <ColorPalette
              baseColor={color.hue(color.hue() + 90)}
              length={9}
              type="tintsAndShades"
              onSelectColor={setBaseColor}
            />
            <ColorPalette
              baseColor={color.hue(color.hue() + 270)}
              length={9}
              type="tintsAndShades"
              onSelectColor={setBaseColor}
            />
          </ColorGroup>
        </Route>
        <Route>
          <ColorGroup layout="column">
            <ColorPalette
              baseColor={color}
              length={9}
              type="tintsAndShades"
              onSelectColor={setBaseColor}
            />
          </ColorGroup>
        </Route>
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
