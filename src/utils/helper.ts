import { Status } from './enum';

export const translateStatus = (status: Status): string => {
  switch (status) {
    case Status.Active: return 'Активен';
    case Status.Problem: return 'Проблемы';
    case Status.Compl: return 'Завершен';
    case Status.New: return 'Новый';
    case Status.Check: return 'Проверка';
    default: return status;
  }
};

// Для обратного перевода (если понадобится)
export const translateStatusBack = (text: string): Status | null => {
  switch (text) {
    case 'Активен': return Status.Active;
    case 'Проблемы': return Status.Problem;
    case 'Завершен': return Status.Compl;
    case 'Новый': return Status.New;
    case 'Проверка': return Status.Check;
    default: return null;
  }
};

export function formatDate(date: Date): string {
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }