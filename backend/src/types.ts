export type ID_client= number;

export interface Client{
    id:ID_client;
    name:string;
    status:Status;
    lastUpdate:Date;
}
export const enum Status{
    Active='Активен',
    Problem='Проблемы',
    New='Новый',
    Compl='Завершен',
    Check='Проверка'
}