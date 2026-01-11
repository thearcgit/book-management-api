// logger.js
import { Request, Response, NextFunction } from 'express'
import { TokenIndexer } from 'morgan';
import winston from 'winston';
import { ERROR, INFO, WARN } from '../constants/loggerLevel.js';


// Winston access log
export const accessLogger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf((info: winston.Logform.TransformableInfo & {
            timestamp?: string;
            ip?: string;
        }): string => {
            const { timestamp, level, message, ip } = info

            // message can be unknown
            const safeMessage = typeof message === "string" ? message : JSON.stringify(message)

            return `[${ip || "unknown"}] - - [${timestamp}] ${level.toUpperCase()}  - ${safeMessage}`;
        })
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: `logs/app.log` })
    ],
});


// Morgan logic
export const morganHandler = (tokens: TokenIndexer<Request, Response>, req: Request, res: Response) => {
    const token = (name: string): string => {
        return tokens[name]?.(req, res) ?? `-`
    }
    const status = Number(token(`status`)) || 0
    const level = status >= 500 ? ERROR : status >= 400 ? WARN : INFO
    const logDetails = [
        token(`method`),
        token(`url`),
        token(`status`),
        '-',
        token(`response-time`),
        'ms'
    ].join(' ');

    accessLogger.log(level, { message: logDetails, ip: token(`remote-addr`), })
    return null
}