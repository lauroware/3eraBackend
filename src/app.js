import express, { application } from "express"
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"
import viewProds from "./routes/viewProds.router.js"
import viewCart from "./routes/viewCart.router.js"
import chatRouter from "./routes/chat.router.js"
import handlebars from "express-handlebars"
import {__dirname} from "./utils.js"
import {Server} from "socket.io"
import "./dao/mongoManagers/dbConfig.js"
import cookieParser from "cookie-parser"
import session from "express-session"
import viewsRouter from "./routes/views.router.js"
import usersRouter from "./routes/users.router.js"
import mockRouter from "./routes/mock.router.js"
import sessionsRouter from "./routes/sessions.router.js"
import mongoStore from "connect-mongo"
import passport from "passport"
import CustomError from "./utils/errors/customError.js"
import "./passport/passportStrategies.js"
import config from "./config.js"
import { errorMiddleware } from "./utils/errors/errors.middleware.js"
import logger from "./utils/winston.js"
import { createLog } from "./middlewares/winston.middleware.js"
import loggerTest from "./routes/loggerTest.router.js"

const app = express() 
const PORT = config.PORT

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+"/public"))

/* configuro cookieParser, session con mongo session*/
app.use(cookieParser()) 
app.use(
    session({
      secret: 'sessionKey',
      resave: false,
      saveUninitialized: true,
      store: new mongoStore({
        mongoUrl: config.MONGOURL
      }),
    })
  )

/* passport */
app.use(passport.initialize())
app.use(passport.session())

/* http server */
const httpServer = app.listen(PORT, () => {
  console.log(`Server OK en puerto ${PORT}`)
})

/* websocket server */

export const socketServer = new Server(httpServer)


/* redirect login */
app.get("/", (req,res)=>{
  res.redirect("/views")
})

/*  seteo handlebars*/
app.engine('handlebars',handlebars.engine())
app.set('view engine','handlebars')
app.set('views',__dirname+'/views')




/* rutas */
app.use("/products/", viewProds)
app.use("/carts", viewCart)
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/users", usersRouter)
app.use("/views", viewsRouter)
app.use("/api/sessions", sessionsRouter)
app.use("/chat", chatRouter)
app.use("/mockingproducts", mockRouter)
app.use("/loggerTest", loggerTest)

/* error middleware */
app.use(errorMiddleware)
app.use(createLog)