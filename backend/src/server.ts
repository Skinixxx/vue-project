import dotenv from 'dotenv';
import app from './app';
import config from './config/config';
import helmet from 'helmet';

dotenv.config();

const PORT = config.PORT || 3001;

app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        connectSrc: ["'self'", `http://localhost:${PORT}`]
      }
    }
  }));

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Enviroment: ${config.NODE_ENV}`);
})