import React from "react";

// uncomment below line to load LargeComponent eagerly
// import LargeComponent from "./LargeComponent";
function LargeComponentWrapper() {

  // comment below line to load LargeComponent lazily
  const LazyLargeComponent = require('./LargeComponent').default;

  return (
    // comment below line to load LargeComponent lazily
    <LazyLargeComponent />

    // uncomment below line to load LargeComponent eagerly
    // <LargeComponent />
  );
}
export default LargeComponentWrapper;
