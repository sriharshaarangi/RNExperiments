import React from 'react';
function LargeComponentWrapper() {
  const Component = import(
    /* webpackChunkName: "largeComponent" */ './LargeComponent'
  );
  // @ts-ignore
  return <Component />;
}
export default LargeComponentWrapper;
