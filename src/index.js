import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider } from '@material-ui/core/styles';
import {lightTheme,darkTheme} from './Components/theme'
import { CssBaseline } from '@material-ui/core';
const t = localStorage.getItem('theme');
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={t === 'light' ? lightTheme: darkTheme}>
      <CssBaseline>
        <App />
      </CssBaseline>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
