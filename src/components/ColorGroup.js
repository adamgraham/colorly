import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './ColorGroup.css';

const ColorGroup = ({ children, className, layout = 'column' }) => (
  <div
    className={classNames(
      'color-group',
      { [`color-group--${layout}`]: layout },
      className
    )}
  >
    {children}
  </div>
);

ColorGroup.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  layout: PropTypes.oneOf(['column', 'column-reverse', 'row', 'row-reverse']),
};

export default ColorGroup;
