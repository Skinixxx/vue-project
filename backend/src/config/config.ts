import dotenv from 'dotenv';

dotenv.config();

interface Config {
  PORT: number;
  NODE_ENV: 'development' | 'production' | 'test';
  DATA_FILE_PATH: string;
  LOG_LEVEL: 'error' | 'warn' | 'info' | 'debug';
}

const config: Config = {
  PORT: parseInt(process.env.PORT || '3001'),
  NODE_ENV: (process.env.NODE_ENV as any) || 'development',
  DATA_FILE_PATH: process.env.DATA_FILE_PATH || './data/clients.json',
  LOG_LEVEL: (process.env.LOG_LEVEL as any) || 'info'
};

export default config;