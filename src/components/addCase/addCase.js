import React, {Component} from 'react';
import {View, Text, Image, ScrollView, TouchableHighlight} from 'react-native';

import styles from './addCase.styles';
const imagePickerPlaceHolder = require('../../assets/imagePickerPlaceholder.png');

export default class AddCase extends Component {
  changeImage() {

  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <TouchableHighlight
          underlayColor = {'white'}
          onPress = {this.changeImage.bind(this)}>
          <View  style={styles.imagePickerContainer}>
            <Image source={imagePickerPlaceHolder} />
            <Text>
              Fotos
            </Text>
          </View>
        </TouchableHighlight>
      </ScrollView>
    )
  }
}
