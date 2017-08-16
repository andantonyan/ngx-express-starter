import { Request, Response, NextFunction } from 'express';
const pkg = require('../../../../package.json');

const indexHandler = (req: Request, res: Response, next: NextFunction) => {
  res.json({version: pkg.version});
};

export { indexHandler };

