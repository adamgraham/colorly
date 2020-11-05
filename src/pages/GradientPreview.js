import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { shuffleSecondaryBaseColor } from '../actions';
import { getSecondaryBaseColors } from '../selectors';
import { withBaseColor } from '../utils/hoc';
import './GradientPreview.css';

const GradientPreview = ({ baseColor, secondaryBaseColor }) => {
  const dispatch = useDispatch();
  const secondaryColors = useSelector(getSecondaryBaseColors);

  // If the secondary color has never been changed throughout the app session,
  // then shuffle it once to make the gradient more interesting to start.
  useEffect(() => {
    if (secondaryColors.length === 1 && secondaryColors[0] === '#000000') {
      dispatch(shuffleSecondaryBaseColor());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <article className="page gradient-preview">
      <div
        className="gradient-card"
        style={{
          background: `linear-gradient(90deg, ${baseColor} 0%, ${secondaryBaseColor} 100%)`,
        }}
      />
    </article>
  );
};

GradientPreview.propTypes = {
  baseColor: PropTypes.string,
  secondaryBaseColor: PropTypes.string,
};

export default withBaseColor(GradientPreview);
