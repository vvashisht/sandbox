// @flow

// 1 wk of OHLCV data from 1 exch for currencies: BTC/USD, ETH/BTC, XLM/XBT
// in 3 separate CSV files

import compression from 'compression';
import express from 'express';

import ccxt from 'ccxt';

import { APP_NAME, STATIC_PATH, WEB_PORT } from '../shared/config';
import { isProd } from '../shared/util';
import renderApp from './render-app';

const app = express();

app.use(compression());
app.use(STATIC_PATH, express.static('dist'));
app.use(STATIC_PATH, express.static('public'));

app.get('/', (req, res) => {
  let exchange = new ccxt.kraken();
  exchange.fetchTicker('BTC/USD')
    .then((data) => {
      res.send(renderApp(APP_NAME, JSON.stringify(data, null, 2)));
    });
});

app.listen(WEB_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${WEB_PORT} ${isProd ? '(production)' : '(development)'}.`);
});
