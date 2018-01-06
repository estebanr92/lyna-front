import React, {Component} from 'react';
import {View, Text, Image, ScrollView, TouchableHighlight, TextInput, Button} from 'react-native';
import Geocoder from 'react-native-geocoding';
import CheckBox from 'react-native-checkbox';
import ImagePicker from 'react-native-image-picker';

import styles from './addCase.styles';
const imagePickerPlaceHolder = require('../../assets/imagePickerPlaceholder.png');
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import constants from '../../utils/constants';

Geocoder.setApiKey(constants.GoogleAPIKey);

export default class AddCase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      caseType: 'emergency',
      contactName: '',
      contactNumber: '',
      fetchedDirection: '',
      manualDirection: '',
      isManualLocation: false,
      caseImage: ''
    }
  }
  componentWillMount() {
    navigator.geolocation.getCurrentPosition((response) => {
      console.log('geo', response);
      Geocoder.getFromLatLng(response.coords.latitude,response.coords.longitude ).then(
        json => {
          console.log(json.results[0]);
          const direction = json.results[0].address_components[0].long_name + ' ' + json.results[0].address_components[1].long_name +
            ', ' +json.results[0].address_components[2].long_name +', ' + json.results[0].address_components[3].long_name +
           ', ' + json.results[0].address_components[4].long_name;
          this.setState({fetchedDirection:direction || 'Ubiación automatica no encontrada'})
        },
        error => {
          console.log(error);
          alert('error', error);
        }
      );
    }, (error) => {
      console.log(error);
    });
  }
  changeImage() {
    const options = {
      title: 'Select Photo',
      mediaType: 'photo',
      maxWidth: 350,
      maxHeight: 350
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        const imageToSave = 'data:image/jpeg;base64,' + response.data;
        this.setState({'caseImage':imageToSave});
        console.log('statsssse', this.state);

      }
    });
  }

  changeToManualLocation() {
    this.setState({isManualLocation: !this.state.isManualLocation})
  }

  changeFieldValue(value, field)  {
    console.log('cambiando', field, value);
    this.setState({[field]:value});
  }

  changeCaseType(value) {
    this.setState({caseType: value});
  }

  renderManualLocationInput() {
    if(this.state.isManualLocation) {
      return (
        <TextInput
          placeholder={'Tu ubicación'}
          style={styles.descriptionInput}/>
      )
    }
  }

  renderImage() {
    console.log('rrender');
    if(this.state.caseImage.length === 0) {
      return (
        <View  style={styles.imagePickerContainer}>
          <Image source={imagePickerPlaceHolder} />
          <Text>
            Fotos
          </Text>
        </View>
      )
    }
    console.log('222');
    return (
      <View  style={styles.imagePickerContainer}>
        <Image style={styles.caseImage} source={{uri: this.state.caseImage}} />
      </View>
    )

  }

  render() {
    const caseTypes = [
      {label: 'Emergencia', value: 'emergency'},
      {label: 'Adopción', value: 'adoption'}
    ];

    const manualLocationInput = this.renderManualLocationInput();

    return (
      <ScrollView style={styles.container}>
        <TouchableHighlight
          underlayColor = {'white'}
          onPress = {this.changeImage.bind(this)}>
          {this.renderImage()}
        </TouchableHighlight>
        <View style = {styles.caseType}>

          <Text style = {styles.inputLabel}>
            Deseo reportar:
          </Text>

          <View style = {styles.typeInputRow}>
            <RadioForm
              animation = {true}
              formHorizontal={true}
            >
              <RadioButton labelHorizontal={true} key={1} >
                <RadioButtonInput
                  index={1}
                  isSelected={true}
                  onPress={() => {}}
                  buttonSize={40}
                  buttonOuterSize={80}
                  buttonStyle={{}}
                  buttonWrapStyle={{marginLeft: 10}}
                />

              </RadioButton>
              <RadioButtonLabel
                obj={caseTypes}
                index={1}
                labelHorizontal={true}
                onPress={() => {}}
                labelWrapStyle={{}}
              />
            </RadioForm>
          </View>

        </View>

        <View style = {styles.fieldCol}>

          <Text style = {styles.inputLabel}>
            Ubicación:
          </Text>

          <Text style={styles.locationText}>
            {this.state.fetchedDirection}
          </Text>

          <View style = {styles.manualLocationSelectorRow}>
            <Text style={styles.manualLocationLabel}>
              Seleccionar ubiación manualmente
            </Text>
            <CheckBox
              label=''
              checked={this.state.isManualLocation}
              containerStyle={styles.checkboxStyle}
              onChange={this.changeToManualLocation.bind(this)}
            />
          </View>

          {manualLocationInput}


        </View>

        <View style = {styles.fieldCol}>

          <Text style = {styles.descriptionInputLabel}>
            Descripción:
          </Text>

          <TextInput
            placeholder={'Opcional'}
            multiline={true}
            numberOfLines={3}
            style={styles.descriptionInput}/>

        </View>

        <View style = {styles.fieldCol}>

          <Text style = {styles.inputLabel}>
            Contacto:
          </Text>

          <View style = {styles.contactRow}>
            <View style = {styles.contactLabelContainer}>
              <Text style={styles.contactLabel}>
                Nombre:
              </Text>
            </View>

            <TextInput
              placeholder={'Opcional'}
              style={styles.contactInput}/>
          </View>


          <View style = {styles.contactRow}>
            <View style = {styles.contactLabelContainer}>
              <Text style={styles.contactLabel}>
                Telefono:
              </Text>
            </View>

            <TextInput
              placeholder={'Opcional'}
              style={styles.contactInput}/>
          </View>

        </View>

        <View style = {styles.buttonContainer}>
          <Button
            onPress={() => {
              alert('as')
            }}
            style = {styles.button}
            title="Reportar"
            color="#00011e"
            accessibilityLabel=""
          />
        </View>


      </ScrollView>
    )
  }
}
