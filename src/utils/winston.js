import winston from "winston"
import config from "../config.js"

const customLevels = {
    levels: {
        fatal: 0,
        error: 0,
        warning: 1,
        info: 2,
        http: 3,
        debug: 3
    },
    colors: {
        fatal: "red",
        error: "red",
        warning: "yellow",
        info: "blue",
        http: "green",
        debug: "green"
    }
}

let logger = " "

if(config.NODE_ENV === "production"){
    logger = winston.createLogger({
        levels: customLevels.levels,
        transports:[
            new winston.transports.Console({
                level: "info",
                format: winston.format.combine(
                    winston.format.colorize({colors:customLevels.colors}),
                    winston.format.simple()
                ),
        }),
            new winston.transports.File({
                level: "error",
                filename: "errors.log"
            })
        ]
    }) 
} else {
    logger = winston.createLogger({
        transports:[
            new winston.transports.Console({
                level: "debug",
                format: winston.format.combine(
                    winston.format.colorize({colors:customLevels.colors}),
                    winston.format.simple()
                ),
        }),
            new winston.transports.File({
                level: "error",
                filename: "errors.log"
            })
        ]
    })
}

export default logger