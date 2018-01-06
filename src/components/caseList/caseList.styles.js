import {StyleSheet} from 'react-native';
import colors from '../../utils/colors';

export default styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',
    backgroundColor:'white'
  },
  tabRow: {
    flex:1,
    flexDirection: 'row',
    marginTop:3
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
  },
  selectedTab: {
    backgroundColor: '#00b3e3',
    borderRadius: 40,
  },
  tabLabel: {
    color: 'black',
    fontSize: 18
  },
  selectedTabLabel: {
    color: 'white'
  }
});
