import { Notifications } from "@/utils/enum";
import { Client } from "./Client";

export type ID_Notif=number;

export interface Notification{
    id:ID_Notif;
    message:string|Client;
    type: Notifications;
    timestap:Date;
}
