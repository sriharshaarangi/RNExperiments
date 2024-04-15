import React from 'react';
import {Text} from 'react-native';
function LargeComponentWrapper() {
  const LazyLargeComponent = React.lazy(
    () => import(/* webpackChunkName: "largeComponent" */ './LargeComponent'),
  );
  return (
    <React.Suspense fallback={<Text>Loading Remote Module...</Text>}>
      <LazyLargeComponent />
    </React.Suspense>
  );
}
export default LargeComponentWrapper;
