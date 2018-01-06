import React, {Component} from 'react';
import {View, Text, Image, ScrollView, TouchableHighlight, TextInput, Button, Alert} from 'react-native';
import Geocoder from 'react-native-geocoding';
import CheckBox from 'react-native-checkbox';
import ImagePicker from 'react-native-image-picker';
import styles from './addCase.styles';
import RadioButton from 'react-native-radio-button'
import constants from '../../utils/constants';
const imagePickerPlaceHolder = require('../../assets/imagePickerPlaceholder.png');
const defaultFetchLocationMessage = 'Ubicación automatica en proceso';
const fetchedLocationNotFoundMessage = 'Ubicación automatica no encontrada';

Geocoder.setApiKey(constants.GoogleAPIKey);

export default class AddCase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      caseType: 'emergency',
      caseDescription: '',
      contactName: '',
      contactNumber: '',
      fetchedLocation: defaultFetchLocationMessage,
      manualLocation: '',
      isManualLocation: false,
      caseImage: ''
    }
  }

  componentWillMount() {
    this.getUserLocation();
  }

  render() {

    return (
      <ScrollView style={styles.container}>

        {this.renderImageSection()}

        {this.renderCaseTypeSection()}

        {this.renderLocationSection()}

        {this.renderDescriptionSection()}

        {this.renderContactSection()}

        {this.renderSendButton()}


      </ScrollView>
    )
  }

  renderImageSection() {
    return (
      <TouchableHighlight
        underlayColor = {'white'}
        onPress = {this.changeImage.bind(this)}>

        {this.renderImage()}

      </TouchableHighlight>
    )
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
        const imageToSave = 'data:image/jpeg;base64,' + response.data;
        this.setState({'caseImage':imageToSave});
      }
    });
  }

  renderManualLocationInput() {
    if(this.state.isManualLocation) {
      return (
        <TextInput
          placeholder={'Tu ubicación'}
          style={styles.descriptionInput}
          onChangeText={this.changeFieldValue.bind(this, 'manualLocation')}
        />
      )
    }
  }

  renderCaseTypeSection() {

    const caseTypeEmergency = this.state.caseType === 'emergency';

    return (
      <View style = {styles.caseType}>

        <Text style = {styles.inputLabel}>
          Deseo reportar:
        </Text>

        <View style = {styles.typeInputRow}>
          <RadioButton
            animation={'bounceIn'}
            isSelected={caseTypeEmergency}
            onPress={() => this.changeFieldValue('caseType', 'emergency',)}
          />
          <Text style={[styles.caseTypeLabel, styles.caseTypeLabelEmergency]}>
            Emergencia
          </Text>
          <RadioButton
            animation={'bounceIn'}
            isSelected={!caseTypeEmergency}
            onPress={() => this.changeFieldValue('caseType', 'adoption')}
          />
          <Text style={styles.caseTypeLabel}>
            Adopción
          </Text>

        </View>

      </View>
    )
  }

  renderLocationSection() {

    const manualLocationInput = this.renderManualLocationInput();

    return (
      <View style = {styles.fieldCol}>

        <Text style = {styles.inputLabel}>
          Ubicación:
        </Text>

        <Text style={styles.locationText}>
          {this.state.fetchedLocation}
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
    )
  }

  changeToManualLocation() {
    this.setState({isManualLocation: !this.state.isManualLocation})
  }

  renderDescriptionSection() {
    return (
      <View style = {styles.fieldCol}>

        <Text style = {styles.descriptionInputLabel}>
          Descripción:
        </Text>

        <TextInput
          placeholder={'Opcional'}
          multiline={true}
          numberOfLines={3}
          style={styles.descriptionInput}
          onChangeText={this.changeFieldValue.bind(this, 'caseDescription')}
        />

      </View>
    )
  }

  renderContactSection() {
    return (
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
            style={styles.contactInput}
            onChangeText={this.changeFieldValue.bind(this, 'contactName')}
          />
        </View>


        <View style = {styles.contactRow}>
          <View style = {styles.contactLabelContainer}>
            <Text style={styles.contactLabel}>
              Telefono:
            </Text>
          </View>

          <TextInput
            placeholder={'Opcional'}
            style={styles.contactInput}
            onChangeText={this.changeFieldValue.bind(this, 'contactNumber')}
          />
        </View>

      </View>
    )
  }

  renderSendButton() {
    return (
      <View style = {styles.buttonContainer}>
        <Button
          onPress={() => {
              this.createCase();
            }}
          style = {styles.button}
          title="Reportar"
          color="#00b3e3"
          accessibilityLabel=""
        />
      </View>
    )
  }

  renderImage() {
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
    return (
      <View  style={styles.imagePickerContainer}>
        <Image style={styles.caseImage} source={{uri: this.state.caseImage}} />
      </View>
    )

  }

  changeFieldValue(field, value)  {
    this.setState({[field]:value});
  }

  createCase() {
    const caseLocation = this.state.isManualLocation ? this.state.manualLocation : this.state.fetchedLocation;
    const caseToCreate = {
      description: this.state.caseDescription,
      location: caseLocation,
      image: this.state.caseImage,
      contactName: this.state.contactName,
      contactNumber: this.state.contactNumber,
      caseType: this.state.caseType
    };
    validateAndSendCase(caseToCreate);
  }

  getUserLocation() {

    navigator.geolocation.getCurrentPosition((response) => {
      console.log('geo', response);
      Geocoder.getFromLatLng(response.coords.latitude,response.coords.longitude ).then(
        json => {
          console.log('dir', json.results[0]);
          const location = json.results[0].address_components[0].long_name + ' ' + json.results[0].address_components[1].long_name +
            ', ' +json.results[0].address_components[2].long_name +', ' + json.results[0].address_components[3].long_name +
            ', ' + json.results[0].address_components[4].long_name;
          this.setState({fetchedLocation:location})
        },
        error => {
          console.log(error);
          this.setState({fetchedLocation:fetchedLocationNotFoundMessage})

        }
      );
    }, (error) => {
      console.log(error);
      this.setState({fetchedLocation:fetchedLocationNotFoundMessage})
    });
  }

}

const validateAndSendCase = (caseData) => {
  const invalidFetchedLocation = !caseData.isManualLocation && (caseData.location === defaultFetchLocationMessage
    || caseData.location === fetchedLocationNotFoundMessage);

  const invalidManualLocation = caseData.isManualLocation && caseData.manualLocation.length ===0;


  if(invalidFetchedLocation || invalidManualLocation ||caseData.location.length === 0 ) {
    Alert.alert('Información incorrecta', 'La ubicación es invalida');
    return;
  }
  if(caseData.description.length < 10 || caseData.description.length > 4000) {
    Alert.alert('Información incorrecta', 'La descripción no es valida. Debe contener por lo menos 10 caracteres y un maximo de 4000');
    return;
  }
  //TODO Conectar con el backend
  Alert.alert('Gracias', 'Gracias por ayudar!');
};


