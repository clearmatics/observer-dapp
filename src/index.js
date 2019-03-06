import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';
import './index.css';

// import drizzle functions and contract artifact
import { Drizzle, generateStore } from 'drizzle';
import Glienicke from './contract/Glienicke.json';

// get the contract
const options = { contracts: [Glienicke] };

// setup the Drizzle store and Drizzle
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

// pass in the drizzle instance
ReactDOM.render(<App drizzle={drizzle} />, document.getElementById('root'));
serviceWorker.unregister();
