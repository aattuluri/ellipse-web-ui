import { createMuiTheme } from '@material-ui/core/styles';

const darkTheme = createMuiTheme({
  palette: {
      type: "dark",
      primary: {
        main: '#ffffff',
        dark: '#ffffff',
        light: '#000000'
      },
      secondary: {
        main: '#1C1C1E',
       
      },
      background:{
        default: "#000000"
      }
    },
    
});

const lightTheme = createMuiTheme({
  palette: {
      type: "light",
      primary: {
        main: '#000000',
        dark: '#000000',
        light: '#ffffff'
      },
      secondary: {
        main: '#e5e5e5'
      },
      background:{
        default: "#ffffff"
      }
    },
    
});

export {lightTheme,darkTheme};