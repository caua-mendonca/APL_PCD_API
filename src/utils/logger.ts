import { createLogger, format, transports } from 'winston';
import dotenv from 'dotenv';
dotenv.config();

export const logger = createLogger({
  level: 'silly',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.json()
  ),
transports: [
  new transports.File({ filename: 'error.log', level: 'error' }),
  new transports.File({ filename: 'warn.log', level: 'warn' }),
  new transports.File({ filename: 'info.log', level: 'info' }),
  new transports.File({ filename: 'debug.log', level: 'debug' }),
  new transports.File({ filename: 'combined.log' })
]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple()
    )
  }));
}


