import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "./font/font.css";

import { MuiThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  typography: {
    fontFamily: '"GowunDodum-Regular", "Noto Sans KR", serif'
  }
})

// App을 MuiThemeProvider로 감싸고 위에서 명시한 theme을 적용할 수 있도록 한다.
// App 전체에 설정한 폰트가 적용될 수 있도록 해준다.
ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}><App /></MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
