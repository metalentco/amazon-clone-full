import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { MoralisProvider } from "react-moralis";
import store from "./redux/store";
import { Provider } from "react-redux";
import '@rainbow-me/rainbowkit/styles.css';


import {
  Chain,
  apiProvider,
  configureChains,
  getDefaultWallets,
  connectorsForWallets,
  RainbowKitProvider,
  wallet
} from '@rainbow-me/rainbowkit';
import { chain, createClient, WagmiProvider, WagmiConfig } from 'wagmi';
// import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

const bscChain = {
  id: 97,
  name: 'BSC testnet',
  network: 'BSC',
  iconUrl: '',
  nativeCurrency: {
    decimals: 18,
    name: 'BSC',
    symbol: 'BSC',
  },
  rpcUrls: {
    default: 'https://data-seed-prebsc-1-s1.binance.',
  },
  blockExplorers: {
    default: { name: 'BSC testnet', url: 'https://explorer.binance.org/smart-test' }
  },
  testnet: true,
}

const { chains, provider } = configureChains(
  [bscChain],
  [
    apiProvider.jsonRpc(chain => ({
      rpcUrl: 'https://data-seed-prebsc-1-s1.binance.'
    }))
  ]
);

const { wallets } = getDefaultWallets({
  appName: 'DApp',
  chains,
});

const connectors = connectorsForWallets([
  {
    groupName: 'Wallets',
    wallets: [
      wallet.metaMask({ chains }),
      wallet.trust({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});


ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider appId="qhb9iMH9bcjrXkiayE9DeXeMyyOzUn4XSYkYh2Cv" serverUrl="https://cbrqbqelmgs3.usemoralis.com:2053/server">
      <BrowserRouter>
        <WagmiProvider client={wagmiClient}>
          <RainbowKitProvider chains={chains}>
            <App />
          </RainbowKitProvider>
        </WagmiProvider>
      </BrowserRouter>
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
