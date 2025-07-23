import { NextFunction, Request, Response } from "express";
import { getClients } from "../services/serviceClient"
import * as clientService from '../services/serviceClient';
import { StatusCodes } from 'http-status-codes';


  
    export const getAllClients=async(req: Request, res: Response,next:NextFunction) =>{
      try {
        const clients = await clientService.getClients();
        res.status(StatusCodes.OK).json(clients);
      } catch (error) {
        next(error);
        
      }
    }
  
    export const getClientById= async(req: Request, res: Response)=> {
      
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid client ID' });
          }
        try {
        const client = await clientService.getClientById(id);
        
        if (!client) {
          return res.status(StatusCodes.NOT_FOUND).json({
            error: 'Client not found'
          });
        }
        
        res.status(StatusCodes.OK).json(client);
      } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: error});
      }
    }
  
    export const updateClientStatus= async(req: Request, res: Response) =>{
      try {
        const id = parseInt(req.params.id);
        const newStatus = req.body.newStatus ;
        
        const updatedClient = await clientService.updateStatus(id, newStatus);
        res.status(StatusCodes.OK).json(updatedClient);
      } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: error});
      }
    }
  
   export const getAvailableStatuses = (req:Request,res:Response)=>{
    try {
        const statuses = clientService.getStatusOptions();
        res.json(statuses);
    } catch (error) {
        res.status(500).json({ error: error });
    }
   }