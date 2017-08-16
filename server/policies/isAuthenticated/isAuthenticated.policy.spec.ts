import { NextFunction, Request, Response } from 'express';

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.session['user']) {
    next();
  } else {
    res.status(401).end();
  }
};

export { isAuthenticated }
