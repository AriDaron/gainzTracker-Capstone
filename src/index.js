import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {GainzTracker} from "./components/GainzTracker";
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    < GainzTracker/>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();

