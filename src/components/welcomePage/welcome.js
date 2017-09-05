import React, {Component} from 'react';
import {View, Text, Image, TouchableHighlight} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles from './welcome.styles';


export default class Welcome extends Component {
  onAddCaseClick() {
    Actions.addCasePage();
  }
  onCasesListClick() {
    Actions.casesListPage();
  }

  render() {
    const addCaseImageRoute = require('../../assets/addCase.png');
    const casesListImageRoute = require('../../assets/addCase.png');
    return (
      <View style = {styles.container}>
        <TouchableHighlight onPress = {this.onAddCaseClick.bind(this)}>
          <View>
            <Image source={addCaseImageRoute}/>
            <Text>
              Reportar emergencia/adopción
            </Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight onPress = {this.onCasesListClick.bind(this)}>
          <View>
            <Image source={casesListImageRoute}/>
            <Text>
              Ayudar en emergencia/adopción
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}