import { Status } from "@/utils/enum";
export type ID_client= number;

export interface Client{
    id:ID_client;
    name:string;
    status:Status;
    lastUpdate:Date;
}