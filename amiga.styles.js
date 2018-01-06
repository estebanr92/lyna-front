import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
  statusBar: {
    backgroundColor:'#00011e'
  },
  navBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
  },
  navBarTitle:{
    color:'red',

  },
  barButtonIconStyle: {
    tintColor: 'red'
  },
  container: {
    flex: 1,
    backgroundColor:'white',
    flexDirection: 'column',
    width:'100%',
    height:'100%'
  }
});