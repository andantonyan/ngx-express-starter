'use strict';
import { join } from 'path';
import { IConfig } from '../types';

const config: IConfig = {
  port: 3000,
  secret: 'WlXhIaH11Tk3Dg3HV7Sl5Ax33UxYvVoQurcfasq6SH8=',
  fileLog: join(__dirname, '../../../', 'ngx-express-starter.log'),
};

export = config;
