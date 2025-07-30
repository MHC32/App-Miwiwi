export const COLORS = {
  primary: {
    main: '#2020030',
    contrastText: 'rgba(255, 255, 255, 1)', 
    gray: '#BCBCBC'
  },


  alert: {
    negative: '#CD262654', 
    negativeDark: '#CD2626', 
    positive: '#26CD4154',
    positiveDark: '#43A932',
  },

  secondary: {
    dark: '#202002',
  },


  common: {
    white: '#FFFFFF',
    black: '#000000',
  },

  text: {
    primary: '#202002', 
    negativeDark: '#CD2626', 
  }
};




export const withOpacity = (hexColor, opacity) => {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};