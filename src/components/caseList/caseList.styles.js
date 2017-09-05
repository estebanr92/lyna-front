import {StyleSheet} from 'react-native';
import colors from '../../utils/colors';

export default styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column'
  },
  tabBarDivision: {
    flex:1,
    flexDirection: 'column',
    alignItems:'center',
    justifyContent: 'center',
  },
  tabBarDivisionLeft: {
    borderRightWidth:1,
    borderColor:'white'
  }
});
