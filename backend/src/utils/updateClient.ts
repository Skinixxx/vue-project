import { Client } from "../types/types"

export const funcLastUpdate=(entity:Client)=>{
    entity.lastUpdate= new Date();
}