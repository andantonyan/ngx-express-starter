'use strict';
import { join } from 'path';
import { IConfig } from '../types';

const config: IConfig = {
  port: 3000,
  secret: 'fRmRO5mqrW6gir6TRM06+FjCmo6frE86oxZ8wL+OvqA=',
  fileLog: join(__dirname, '../../../', 'ngx-express-starter.log'),
};

export = config;
