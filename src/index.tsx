import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {SWRConfig} from "swr";
import {fetcher} from "./domain/swr/fetcher";
import App from './pages/App';
import reportWebVitals from './reportWebVitals';
import {MantineProvider} from "@mantine/core";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <MantineProvider
          theme={{
              loader: 'bars',
              fontFamily: 'Roboto, sans-serif',
              colors: {
                  green: [
                      "",
                      '#b5ffd0',
                      '#8aff9a',
                      '#60ff65',
                      '#3eff31',
                      '#049d52',
                      '#00754d',
                      '#005439',
                      '#003828',
                      '#001c14'
                  ]
              }
          }}
          withGlobalStyles
          withNormalizeCSS>
          <SWRConfig
              value={{ fetcher }}
          >
            <App />
          </SWRConfig>
      </MantineProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
