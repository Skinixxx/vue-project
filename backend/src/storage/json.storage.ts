import { Client, clientStatus } from "../types/types";
import {parseJSON} from "../utils/parseJson";
import path from "path";
import { funcLastUpdate } from "../utils/updateClient";
import { promises } from "fs";


const DATA_FILE = path.join(__dirname,'../../data/clients.json');

// find all clients
export const readData = async ():Promise<Client[]> => {
try {
    const data = await promises.readFile(DATA_FILE,'utf-8');
    // от некста тольку 0 но удалять не охото ахахах
    
    return JSON.parse(data);
} catch (error) {
    console.error('Error reading data:',error);
    return [];
}
};

export const writeData = async(data:Client[]):Promise<boolean> => {
    try {
        await promises.writeFile(DATA_FILE,JSON.stringify(data,null,2))
        return true;
    } catch (error) {
        console.error(`Error writing data:${error}`);
        return false;
    }
}
