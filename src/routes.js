import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useLocation } from 'react-router-dom';
import { setBaseColor } from './actions';
import {
  ColorBlindness,
  ContrastRatio,
  GradientPreview,
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
  harmonies: {
    path: '/harmonies',
    name: 'Harmonies',
    component: Harmonies,
    useSubheader: true,
  },
  hues: {
    path: '/hues',
    name: 'Color Hues',
    component: Hues,
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
  gradientPreview: {
    path: '/gradient',
    name: 'Gradient Preview',
    component: GradientPreview,
    useSubheader: false,
    useSecondaryColor: true,
  },
};

const Routes = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    // Colors written with the standard #000000 format
    // are unable to be parsed from the query parameters
    // since the '#' treats it as a hash url. We can
    // circumvent this problem by using the url hash as the
    // color if the query is present but no value is found.
    let color = params.get('color');
    if (color === '' && location.hash) {
      color = location.hash;
    }

    if (color) {
      dispatch(setBaseColor(color));
    }
  }, [dispatch, location]);

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
