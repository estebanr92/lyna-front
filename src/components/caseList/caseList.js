import React, {Component} from 'react';
import {View, Text, Image, TouchableHighlight} from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import styles from './caseList.styles';
import colors from '../../utils/colors';


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
        <View style = {styles.tabRow}>
          <TouchableHighlight onPress={this.changeContext.bind(this,'emergencies')}
                              underlayColor={'white'}
                              style = {
                                [
                                  styles.tabBarDivision,
                                  styles.tabBarDivisionLeft,
                                  this.state.pageContext === 'emergencies' && styles.selectedTab
                                  ]
                              }>
            <Text
              style={
                [
                  styles.tabLabel,
                  this.state.pageContext === 'emergencies' && styles.selectedTabLabel
                  ]
              }>
              Emergencias
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={'white'}
            onPress={this.changeContext.bind(this,'adoptions')}
            style = {
              [
                styles.tabBarDivision,
                this.state.pageContext === 'adoptions' && styles.selectedTab
                ]
            }>
            <Text
              style={
                [
                  styles.tabLabel,
                  this.state.pageContext === 'adoptions' && styles.selectedTabLabel
                  ]
              }>
              Adopciones
            </Text>
          </TouchableHighlight>
        </View>

        <View style = {{flex:9}}>

        </View>

      </View>
    )
  }

  changeContext(context) {
    this.setState({pageContext:context})
  }

}
