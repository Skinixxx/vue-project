import { Client } from "./Client";

export type ID_Notif=number;

export interface Notification{
    id:ID_Notif;
    message:string|Client;
    timestap:ID_Notif[];
}
