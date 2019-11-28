/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import TestPageComponent from './src/test/testPage.js';

AppRegistry.registerComponent(appName, () => TestPageComponent);
