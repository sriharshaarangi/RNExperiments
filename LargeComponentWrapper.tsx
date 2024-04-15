import React from 'react';
import {Text} from 'react-native';
function LargeComponentWrapper() {
  const Component = React.lazy(
    () => import(/* webpackChunkName: "largeComponent" */ './LargeComponent'),
  );
  return (
    <React.Suspense fallback={<Text>Loading Remote Module...</Text>}>
      <Component />
    </React.Suspense>
  );
}
export default LargeComponentWrapper;
