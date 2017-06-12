import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import mapStore from './store/mapStore.jsx';

ReactDOM.render(<App store={mapStore}/>, document.getElementById('root'));