import React from 'react';
import 'remixicon/fonts/remixicon.css';

const camelToKebab = (str: string): string => {
  // extract prefix (Ri, Fa, Md, etc.)
  const prefix = str.substring(0, 2).toLowerCase();

  // remove prefix
  const remaining = str.substring(2);

  const kebabCase = remaining
    .replace(/([A-Z])/g, '-$1')
    .replace(/(\d+)/g, '-$1-') // add dash before and after numbers
    .toLowerCase()
    .replace(/-+/g, '-') // replace multiple dashes with single dash
    .replace(/^-/, '') // remove leading dash
    .replace(/-$/, ''); // remove trailing dash

  return `${prefix}-${kebabCase}`;
};

function UiIcon({ name, size = 24, className = '' }) {
  // RiFlowChart => ri-flow-chart
  // RiHardDrive3Line => ri-hard-drive-3-line
  const iconClass = camelToKebab(name);

  const sizeStyle = size
    ? { fontSize: typeof size === 'number' ? `${size}px` : size }
    : {};

  return (
    <i className={`ui-icon ${iconClass} ${className}`} style={sizeStyle} />
  );
}

export default UiIcon;
