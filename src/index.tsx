import React from 'react';
import ReactDOM from 'react-dom';
import './layout/index.css';
import App from './layout/App';
import reportWebVitals from './reportWebVitals';
import './scss/index.scss'

ReactDOM.render(<App />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
