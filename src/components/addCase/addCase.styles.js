import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',
    backgroundColor:'white',
    padding:20

  },
  imagePickerContainer: {
    flex:1,
    flexDirection: 'column',
    alignItems:'center',
    marginTop:20,
  },
  caseType: {
    flex:1,
    flexDirection: 'column',
    marginTop:20,
  },
  inputLabel: {
    fontSize:20,
    fontWeight:'bold',
    color: 'black',
    marginBottom: 15
  },
  descriptionInputLabel: {
    fontSize:20,
    fontWeight:'bold',
    color: 'black',
  },
  inputRow: {
    flexDirection: 'row',
    flex:1,
  },
  typeInputRow: {
    flexDirection: 'row',
    flex:1,
  },
  fieldCol: {
    flexDirection: 'column',
    marginTop:10
  },
  contactRow: {
    flexDirection: 'row',
    flex:1
  },
  contactLabel: {
   fontSize: 16,
    color: 'black'
  },
  contactInput: {
    marginLeft:15,
    flex:3,
    position: 'relative',
    bottom: '5%'
  },
  descriptionInput: {
    flex:1,
    flexWrap: 'wrap'
  },
  contactLabelContainer: {
    flex:1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30
  },
  locationRow: {
    flexDirection: 'row',
    flex: 1
  },
  locationText: {
    flex:3,
    fontSize: 16,
    color: 'black'
  },
  manualLocationSelectorRow: {
    flexDirection: 'row',
    marginTop: 20
  },
  manualLocationLabel: {
    flex:3,
    fontSize: 16,
  },
  checkboxStyle: {
    marginRight:20
  }
});
