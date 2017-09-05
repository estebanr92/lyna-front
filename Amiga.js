import React, {Component} from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import {Router} from 'react-native-router-flux';
import scenes from './src/routes/index';
import styles from './amiga.styles';
import colors from './src/utils/colors';

export default class App extends Component {

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={colors.mainBlue} />
        <Router
          navigationBarStyle={styles.navBar}
          titleStyle={styles.navBarTitle}
          scenes = {scenes}
          barButtonIconStyle={styles.barButtonIconStyle}>
        </Router>
      </View>
    );
  }
}


