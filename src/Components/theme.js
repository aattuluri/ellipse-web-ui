import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
      type: "dark",
      primary: {
        main: '#ffffff',
        dark: '#ffffff',
        light: '#000000'
      },
      secondary: {
        main: '#1C1C1E'
      },
      background:{
        default: "#000000"
      }
    },
});

export default theme;