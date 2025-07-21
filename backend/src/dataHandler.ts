import { promises } from "fs";
import { Client } from "./types";
import {parseJSON} from "./utils/parseJson";
import path from "path";


const DATA_FILE = path.join(__dirname,'../data/clients.json');

export const readData = async ():Promise<Client[]> => {
try {
    const data = await promises.readFile(DATA_FILE,'utf-8');
    // от некста тольку 0 но удалять не охото ахахах
    const next = parseJSON(data);
    return next;
} catch (error) {
    console.error('Error reading data:',error);
    return [];
}
};

export const writeData = async(data:Client[]):Promise<boolean> => {
    try {
        await promises.writeFile(DATA_FILE,JSON.stringify(data,))
        return true;
    } catch (error) {
        console.error(`Error writing data:${error}`);
        return false;
    }
}

export const findClient = async(id: number):Promise<Client|undefined>=>{
    try {
        const clients = await readData();
        return clients.find(c=>c.id===id);
    } catch (error) {
        console.warn(`Unknow type warn at findClient:${error}`);
        return undefined;
    }
}