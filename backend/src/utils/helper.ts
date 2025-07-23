import { clientStatus } from "../types/types";

export const translateStatus = (status: clientStatus): string => {
    switch (status) {
      case clientStatus.Active: return 'Активен';
      case clientStatus.Problem: return 'Проблемы';
      case clientStatus.Compl: return 'Завершен';
      case clientStatus.New: return 'Новый';
      case clientStatus.Check: return 'Проверка';
      default: return status;
    }
  };
  
  // Для обратного перевода (если понадобится)
  export const translateStatusBack = (text: string): clientStatus | null => {
    switch (text) {
      case 'Активен': return  clientStatus.Active;
      case 'Проблемы': return clientStatus.Problem;
      case 'Завершен': return clientStatus.Compl;
      case 'Новый': return clientStatus.New;
      case 'Проверка': return clientStatus.Check;
      default: return null;
    }
  };