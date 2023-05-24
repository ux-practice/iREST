import {format, createLogger, transports} from 'winston'

const {printf, combine, timestamp, label, colorize} = format

// eslint-disable-next-line no-shadow
export const customFormat = ({label, timestamp, level, message, ...rest}) => `${label} ${timestamp} ${level}: ${message} ${JSON.stringify(rest) === "{}" ? "" : JSON.stringify(rest)}`

const logger = createLogger(process.env.NODE_ENV === 'production' ? {transports: [ new transports.Console({level: 'error'})]}:{
  level: 'debug',
  transports: [
    new transports.Console({
      format: combine(colorize(), combine(
        colorize({
          all: true,
        }),
        label({
          label: '\n[Default Logger]',
        }),
        timestamp({
          format: 'DD-MM-YY HH:MM:SS',
        }),
        printf(customFormat)
      )),
    }),
  ],
})

export default logger
