import { Express } from 'express-serve-static-core';
import { clientStatus } from './types';

declare module 'express-serve-static-core' {
  interface Request {
    clientId?:number;
    newStatus:clientStatus;
  }
  
}