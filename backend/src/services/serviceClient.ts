import { findAll, findEntity, updateEntityStatus,  } from "../repositories/client.repository"
import { writeData } from "../storage/json.storage";
import { Client, clientStatus } from "../types/types";

export const getClients = async (): Promise<Client[]>=>{
    
    return findAll();
}

export const getClientById = async(id:number): Promise<Client|undefined>=>{
    
    const buf = await findEntity(id);
    if(buf===undefined){
        console.warn(`Dosn't find client on this id`);
    }
    return buf;
}

export const setClients = async(data:Client[]):Promise<boolean>=>{
    const bool = await writeData(data);
    if(bool){
        console.info("Sussefully add client(s)");
    }
    return bool;
}
export const updateStatus=async(id:number, clientStatus:clientStatus):Promise<boolean>=>{
    const bool = await updateEntityStatus(id,clientStatus);
    bool? console.info(`Sussefully update client:${id} status`):console.info('bruh');
    return bool;
}

export const getStatusOptions=():clientStatus[]=>{
    return [clientStatus.Active,clientStatus.Problem,clientStatus.New,clientStatus.Compl,clientStatus.Problem];
}