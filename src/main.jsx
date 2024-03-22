import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import { reduxStore } from './store/store.js';
import {PersistGate} from "redux-persist/integration/react";
import {persistStore} from "redux-persist"

let persistor=persistStore(reduxStore);

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <Provider store={reduxStore}>
    <PersistGate persistor={persistor}>
<App />
 </PersistGate>
    </Provider>,
)
