import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './PageHeader.css';

const PageHeader = ({ children, className, layout }) => (
  <header
    className={classNames(
      'page-header',
      { [`page-header--layout-${layout}`]: layout },
      className
    )}
  >
    {children}
  </header>
);

PageHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  layout: PropTypes.oneOf(['center', 'space-between']),
};

export default PageHeader;
