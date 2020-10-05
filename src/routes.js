import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  ColorBlindness,
  ContrastRatio,
  Harmonies,
  Hues,
  Lightness,
  Saturation,
  TintsAndShades,
} from './pages';

export const routes = {
  tintsAndShades: {
    path: '/tints-and-shades',
    name: 'Tints & Shades',
    component: TintsAndShades,
    exact: true,
  },
  lightness: {
    path: '/lightness',
    name: 'Lightness',
    component: Lightness,
  },
  saturation: {
    path: '/saturation',
    name: 'Saturation',
    component: Saturation,
  },
  hues: {
    path: '/hues',
    name: 'Hues',
    component: Hues,
  },
  harmonies: {
    path: '/harmonies',
    name: 'Harmonies',
    component: Harmonies,
    useSubheader: true,
  },
  colorBlindness: {
    path: '/color-blindness',
    name: 'Color Blindness',
    component: ColorBlindness,
    useSubheader: true,
  },
  contrastRatio: {
    path: '/contrast',
    name: 'Contrast Ratio',
    component: ContrastRatio,
    useSubheader: true,
    useSecondaryColor: true,
  },
};

const Routes = () => {
  return (
    <Switch>
      {Object.values(routes).map((route) => {
        const Page = route.component;
        return (
          <Route
            key={route.path}
            path={route.path}
            exact={Boolean(route.exact)}
          >
            <Page />
          </Route>
        );
      })}
    </Switch>
  );
};

export default Routes;
