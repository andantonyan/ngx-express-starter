import { Request, Response, NextFunction } from 'express';
import * as pkg from '../../../package.json';

const indexHandler = (req: Request, res: Response, next: NextFunction) => {
  res.json({version: pkg.version});
};

export { indexHandler }
