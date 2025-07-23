import { promises } from "fs";
import { Client, clientStatus } from "../types/types";
import {parseJSON} from "../utils/parseJson";
import path from "path";
import { funcLastUpdate } from "../utils/updateClient";
import { readData, writeData } from "../storage/json.storage";

export const findAll =async():Promise<Client[]>=>{
    try {
        const clients= await readData();
        return clients;
    } catch (error) {
        console.warn("Not clients");
        return [];
    }
}


export const findEntity = async(id: number):Promise<Client|undefined>=>{
    try {
        const clients = await readData();
        return clients.find(c=>c.id===id);
    } catch (error) {
        console.warn(`Unknow type warn at findClient:${error}`);
        return undefined;
    }
}

export const updateEntityStatus = async(id:number,newStatus:clientStatus
):Promise<boolean>=>
{
    const clients = await readData();
    const clientsIndex = clients.findIndex(c=> c.id==id);

    if(clientsIndex === -1){
        throw new Error('Client not found');
    }
    //it's for debbug then it need to delete
    const old_status= clients[clientsIndex].status;

    clients[clientsIndex].status=newStatus;
    funcLastUpdate(clients[clientsIndex]);
    console.info(`Sussefully update Client status. Old:${old_status}. New:${
        clients[clientsIndex].status}`);
        
    try {
        await writeData(clients);
        return true;
    } catch (error) {
        console.error('Error saving clients data');
        return false;
    }
}