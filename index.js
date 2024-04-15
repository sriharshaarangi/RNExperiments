/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import LargeComponentWrapper from './LargeComponentWrapper';

/**
 * We need to set storage for the ScriptManager to enable caching. This enables us to avoid downloading the same script multiple times.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Script, ScriptManager} from '@callstack/repack/client';
ScriptManager.shared.setStorage(AsyncStorage);

/**
 * We need to set a resolver for the ScriptManager to enable loading scripts from the remote server.
 * The resolver is a function that takes a scriptId and returns a promise that resolves to a script object.
 * The script object has the following shape:
 */
ScriptManager.shared.addResolver(async (scriptId) => {
  // For development we want to load scripts from the dev server.
  if (__DEV__) {
    return {
      url: Script.getDevServerURL(scriptId),
      cache: false,
    };
  }

  // For production we want to load local chunks from from the file system.
  // if (localChunks.includes(scriptId)) {
  return {
    url: Script.getFileSystemURL(scriptId),
  };
  // }

  /**
   * For production we want to load remote chunks from the remote server.
   *
   * We have create a small http server that serves the remote chunks.
   * The server is started by the `start:remote` script. It serves the chunks from the `build/output` directory.
   * For customizing server see `./serve-remote-bundles.js`
   */
  const scriptUrl = Platform.select({
    ios: `http://localhost:${remoteChunkPort}/build/output/ios/remote/${scriptId}`,
    android: `${remoteChunkUrl}:${remoteChunkPort}/build/output/android/remote/${scriptId}`,
  });

  return {
    url: Script.getRemoteURL(scriptUrl),
  };
});

/**
 * We can also add a listener to the ScriptManager to get notified about the loading process. This is useful for debugging.
 *
 * This is optional and can be removed.
 */
ScriptManager.shared.on('resolving', (...args) => {
  console.log('DEBUG/resolving', ...args);
});

ScriptManager.shared.on('resolved', (...args) => {
  console.log('DEBUG/resolved', ...args);
});

ScriptManager.shared.on('prefetching', (...args) => {
  console.log('DEBUG/prefetching', ...args);
});

ScriptManager.shared.on('loading', (...args) => {
  console.log('DEBUG/loading', ...args);
});

ScriptManager.shared.on('loaded', (...args) => {
  console.log('DEBUG/loaded', ...args);
});

ScriptManager.shared.on('error', (...args) => {
  console.log('DEBUG/error', ...args);
});


AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent(
  'LargeComponentWrapper',
  () => LargeComponentWrapper,
);

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
