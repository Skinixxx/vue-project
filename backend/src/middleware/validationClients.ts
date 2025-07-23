import { Request, Response, NextFunction } from 'express';
import { Client } from '../types/types';

export const validateClientId = (
  req: Request, 
  res: Response, 
  next: NextFunction, 
  id: string
) => {
  const clientId = parseInt(id);
  
  if (isNaN(clientId)) {
    return res.status(400).json({ error: 'Invalid client ID format' });
  }
  
  req.clientId = clientId;
  next();
};

export const validateStatusUpdate = (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  const { newStatus } = req.body;
  const validStatuses = ['Активен', 'Проблемы', 'Новый', 'Завершен', 'Проверка'];
  
  if (!newStatus || !validStatuses.includes(newStatus)) {
    return res.status(400).json({ 
      error: 'Invalid status value',
      validStatuses
    });
  }
  
  next();
};