import React from "react";
function LargeComponentWrapper() {

  const LazyLargeComponent = require('./LargeComponent').default;

  return (
    <LazyLargeComponent />
  );
}
export default LargeComponentWrapper;
