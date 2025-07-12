export const COLORS = {
  primary: {
    main: '#2020030',
    contrastText: 'rgba(255, 255, 255, 1)', 
    gray: '#BCBCBC'
  },


  alert: {
    negative: '#CCD303', 
    negativeDark: '#2020030', 
  },

  secondary: {
    dark: '#202002',
    gold: '#CAA432',
    lightGold: '#BAC241',
    lightGoldTransparent: 'rgba(186, 194, 65, 0.23)',
  },


  common: {
    white: '#FFFFFF',
    black: '#000000',
  },

  text: {
    primary: '#202002', 
    secondary: '#CAA432', 
  }
};




export const withOpacity = (hexColor, opacity) => {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};