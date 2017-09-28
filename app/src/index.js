import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

// Prøver ut React-Router (V4)
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import './index.css';

ReactDOM.render(
    <BrowserRouter>
        <Routes />
    </BrowserRouter>,
    document.getElementById('root')
);
registerServiceWorker();
