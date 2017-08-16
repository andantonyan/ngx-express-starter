import * as config from '../../config';
import * as winston from 'winston';

const transports: any = [
  new winston.transports.Console({
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true
  })
];

if (config.fileLog) {
  transports.push(
    new winston.transports.File({
      level: 'debug',
      filename: config.fileLog,
      handleExceptions: true,
      json: true,
      maxFiles: 5,
      colorize: false
    })
  );
}

const logger = new winston.Logger({
  transports,
  exitOnError: false
});

const loggerStream = {
  write: (message, encoding) => logger.info(message)
};

export { logger, loggerStream };
