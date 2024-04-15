import React from 'react';
function LargeComponentWrapper() {
  const Component = require(/* webpackChunkName: "largeComponent" */ './LargeComponent');
  return <Component />;
}
export default LargeComponentWrapper;
