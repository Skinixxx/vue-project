import { Router } from "express";
import { findClient, readData, writeData } from "./dataHandler";
import { Client } from "./types";

const router= Router();

router.get('/clients',async(req,res)=>{
    try {
        const clients = await readData();
        res.json(clients);
    } catch (error) {
        res.status(500).json({error:'Internal server error'});
    }
});

router.get('/clients/:id',async(req,res)=>{
    const id = parseInt(req.params.id);
    if(isNaN(id)){
        return res.status(400).json({error:'Invalid client id'});
    }
    try {
        const client = await findClient(id);
        if(!client){
            return res.status(404).json({error:'Client not found'});
        }
        res.json(client);
    } catch (error) {
        res.status(500).json({error:'Iternal server error'});
    }
});

////  добавление нового клиента(пока не реализовал во фронтенде)

router.post('/client',async(req,res)=>{
    try {
        const newClient:Partial<Client> = req.body;
        if(!newClient.name || !newClient.status){
            return res.status(400).json({error:'Missing required filds'});
        }
        const clients = await readData();

        const id = Math.max(0,...clients.map(c=>c.id))+1;
        const clientToAdd:Client = {
            id,
            name:newClient.name,
            status:newClient.status,
            lastUpdate:new Date(),
            //notes: newClient.notes || ''
        }
        clients.push(clientToAdd);
        await writeData(clients);
        res.status(201).json(clientToAdd);

    } catch (error) {
        res.status(500).json({error:'Iternal server error'});
    }
});
