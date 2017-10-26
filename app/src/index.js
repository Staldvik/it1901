import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './App';

// Prøver ut React-Router (V4)
import { BrowserRouter } from 'react-router-dom';
import './index.css';

ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.getElementById('root')
);
registerServiceWorker();
