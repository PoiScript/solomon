import 'zone.js/dist/zone-node';

import { enableProdMode } from '@angular/core';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';

const { AppServerModuleNgFactory } = require('../dist/server/main');

enableProdMode();

const app = express();

app.engine(
  'html',
  ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
  }),
);

app.set('view engine', 'html');

app.set('views', './dist/app');

app.get('*.*', express.static('./dist/app'));

app.get('*', (req, res) => res.render('index', { req }));

app.listen(4000, () =>
  console.log('Node server listening on http://localhost:4000'),
);
