import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { DAppProvider, Config, ChainId, NodeUrls } from '@usedapp/core'

const readOnlyUrls: NodeUrls = {
  [2]: "http://localhost:3001/",
  [ChainId.BSC]: "https://bsc-dataseed3.binance.org/",
  [ChainId.Fantom]: "https://rpc.ankr.com/fantom/"
}
const config: Config = {
  readOnlyUrls,
  multicallAddresses: {
    [2]: "0x1234567890123456789012345678901234567890"
  }
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
