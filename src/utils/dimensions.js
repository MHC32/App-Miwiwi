import { Dimensions } from 'react-native';

const window = Dimensions.get('window');


const widthPercentageToDP = (widthPercent) => {
  const elemWidth = parseFloat(widthPercent);
  return window.width * elemWidth / 100;
};

const heightPercentageToDP = (heightPercent) => {
  const elemHeight = parseFloat(heightPercent);
  return window.height * elemHeight / 100;
};


export {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  window
};