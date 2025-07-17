import { Dimensions } from 'react-native';

// Récupère les dimensions initiales de la fenêtre
const window = Dimensions.get('window');

// Fonctions pour convertir en pourcentage
const widthPercentageToDP = (widthPercent) => {
  // Parse le pourcentage en nombre et calcule la valeur réelle
  const elemWidth = parseFloat(widthPercent);
  return window.width * elemWidth / 100;
};

const heightPercentageToDP = (heightPercent) => {
  // Parse le pourcentage en nombre et calcule la valeur réelle
  const elemHeight = parseFloat(heightPercent);
  return window.height * elemHeight / 100;
};

// Exporte les fonctions et les dimensions initiales
export {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  window
};