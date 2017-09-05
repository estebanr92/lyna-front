import React, {Component} from 'react';
import {View, Text, Image, TouchableHighlight} from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import styles from './caseList.styles';
import colors from '../../utils/colors';

const FirstRoute = () => <View style={[ styles.container, { backgroundColor: '#ff4081' } ]} />;
const SecondRoute = () => <View style={[ styles.container, { backgroundColor: '#673ab7' } ]} />;

export default class CasesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cases:[],
      pageContext: 'emergencies',
      index: 0
    };
  }


  render() {
    return (
      <View style = {styles.container}>
        <View style = {{flex:1, flexDirection: 'row', backgroundColor: 'red'}}>
          <TouchableHighlight onPress={() => {}} underlayColor={'white'} style = {[styles.tabBarDivision, styles.tabBarDivisionLeft]}>
            <Text>
              Emergencias
            </Text>
          </TouchableHighlight>
          <TouchableHighlight underlayColor={'white'} onPress={() => {}} style = {styles.tabBarDivision}>
            <Text>
              Adopciones
            </Text>
          </TouchableHighlight>
        </View>

        <View style = {{flex:9}}>

        </View>

      </View>
    )
  }
}
