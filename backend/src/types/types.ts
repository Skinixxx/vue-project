export type ID_client= number;

export interface Client{
    id:ID_client;
    name:string;
    status:clientStatus;
    lastUpdate:Date;
}
export  enum clientStatus{
    Active='Активен',
    Problem='Проблемы',
    New='Новый',
    Compl='Завершен',
    Check='Проверка'
}