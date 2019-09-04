import React from 'react';
import { render } from 'react-dom';

import App from './components/App';
import './assets/styles/style.scss';

render(<App />, document.getElementById('app'));

module.hot.accept();
