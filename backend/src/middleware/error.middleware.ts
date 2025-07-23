import { NextFunction, Request, Response } from "express";

export const errorHandler = (
    err: Error, 
    req: Request, 
    res: Response, 
    next: NextFunction
  ) => {
    console.error(`[${new Date().toISOString()}] Error: ${err.message}`);
    console.error(err.stack);
    
    res.status(500).json({
      error: 'Internal Server Error',
      message: err.message,
      path: req.path
    });
  };