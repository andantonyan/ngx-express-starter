'use strict';

import { Request, Response, NextFunction } from 'express';

module Policy {
  /**
   * check user auth status
   * @param req
   * @param res
   * @param next
     */
  export function isAuthenticated(req: Request, res: Response, next: NextFunction): void {
    if (req.session['user']) {
      next();
    } else {
      res.status(401).end();
    }
  }
}

export = Policy;
