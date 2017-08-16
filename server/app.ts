import { json, urlencoded } from 'body-parser';
import * as compression from 'compression';
import * as express from 'express';
import * as path from 'path';
import * as session from 'express-session';
import * as cookie from 'cookie-parser';
import * as morgan from 'morgan';
import * as config from './config';
import { randomBytes } from 'crypto';

import { infoRouter } from './routes/info/info.route';
import { logger, loggerStream } from './services/util/util.service';

const app: express.Application = express();

app.disable('x-powered-by');

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(compression());
//noinspection TypeScriptValidateTypes
app.use(morgan('combined', { stream: loggerStream }));
app.use(session({
  secret: config.secret,
  genid: () => randomBytes(48).toString('hex'),
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: null }
}));
app.use(cookie());
app.use((req, res, next) => {
  if (req.headers['origin']) {
    res.header('Access-Control-Allow-Origin', req.headers['origin']);
    res.header('Access-Control-Allow-Credentials', 'true');
  } else {
    res.header('Access-Control-Allow-Origin', '*');
  }
  res.header('Access-Control-Expose-Headers', 'X-Auth-Token, X-Auth-DeviceId');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With, X-Auth-Token, X-Auth-DeviceId');

  // intercept OPTIONS method
  if ('OPTIONS' === req.method) {
    return res.status(200).end();
  }

  next();
});
// api routes
app.use('/api/info', infoRouter);

if (app.get('env') === 'production') {
  // in production mode run application from dist folder
  app.use(express.static(path.join(__dirname, '/../client')));
}

// catch 404 and forward to error handler
app.use((req: express.Request, res: express.Response, next) => {
  const err = new Error('Not Found');
  next(err);
});

// production error handler
// no stacktrace leaked to user
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(err.status || 500);
  logger.error(err);
  res.json({
    error: {},
    message: err.message,
  });
});

export { app };
