/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

function logChunks(message, maxChunkSize = 1000) {
  const chunks = [];
  let start = 0;

  while (start < message.length) {
    const end = start + maxChunkSize;
    const chunk = message.slice(start, end);
    chunks.push(chunk);
    start = end;
  }

  for (const chunk of chunks) {
    console.log(chunk);
  }
}

if (__DEV__) {
  const modules = require.getModules();
  const moduleIds = Object.keys(modules);
  const loadedModuleNames = moduleIds
    .filter(moduleId => modules[moduleId].isInitialized)
    .map(moduleId => modules[moduleId].verboseName);
  const waitingModuleNames = moduleIds
    .filter(moduleId => !modules[moduleId].isInitialized)
    .map(moduleId => modules[moduleId].verboseName);

  // make sure that the modules you expect to be waiting are actually waiting
  console.log(
    'RNExperiments | loaded:',
    loadedModuleNames.length,
    'RNExperiments |  waiting:',
    waitingModuleNames.length,
  );

  logChunks(
    `RNExperiments | loadedModuleNames = ${JSON.stringify(
      loadedModuleNames,
      null,
      2,
    )};`,
  );

  logChunks(
    `RNExperiments | waitingModuleNames = ${JSON.stringify(
      waitingModuleNames,
      null,
      2,
    )};`,
  );
}
