import { StyleSheet } from "react-native";
// 'use strict';
import { widthPercentageToDP, heightPercentageToDP, } from 'react-native-responsive-screen';
export const wp = widthPercentageToDP;
export const hp = heightPercentageToDP;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
  },
  target: {
    fontSize: 50,
    // backgroundColor: '#999',
    margin: wp(10),
    textAlign: 'center',
    color: '#000',
    borderRadius: wp(8)
  },
  randomContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',

  },
  random: {
    backgroundColor: '#999',
    width: wp(30),
    marginHorizontal: hp(2),
    marginVertical: hp(2),
    fontSize: 35,
    textAlign: 'center',

  },
  STATUS_PLAYING: {
    backgroundColor: '#999'
  },
  STATUS_WON: {
    backgroundColor: 'green'
  },
  STATUS_LOST: {
    backgroundColor: 'orange'
  },
  random: {
    backgroundColor: '#bbb',
    width: wp(30),
    marginHorizontal: wp(5),
    marginVertical: wp(5),
    fontSize: 35,
    textAlign: 'center',
    borderRadius: wp(8)

  },
  disabled: {
    opacity: 0.4
  },
  resetGame: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: hp(6),
    borderWidth: 0.2,
    backgroundColor: '#999',
    width: wp(75),
    height: hp(7),
    marginVertical: hp(.5)

  },
  resetText: {
    color: '#000',
    fontSize: 20,
  },
  statusText:{
    fontSize:20
  }
})

export default styles;