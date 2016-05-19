import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
const Firebase = require('firebase');
import MessengerContainer from './src/containers/MessengerContainer'

class reactNativeFirebaseSample extends Component {
  render() {
    return (
      <MessengerContainer/>
    );
  }
}

AppRegistry.registerComponent('reactNativeFirebaseSample', () => reactNativeFirebaseSample);
