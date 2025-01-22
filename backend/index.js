import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";

import { regValidator, handleValidationErrors, checkAuth, checkSession } from "./Utilites/middleware.js";
import { logAdd, userGetInfo, userLog, userReg } from "./Utilites/RouteFunc.js";
import { sessionKey } from "./Utilites/jwtKey.js";

mongoose.connect(
    'mongodb+srv://admin:oShell_125791@cluster0.u9q6i.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0'
).then(() => console.log('DB_ok')).catch((err) => console.log('DB_error:',err))
const app = express()
app.use(express.json())
app.use(cors())
app.use(session({
    secret: sessionKey,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000*60*60
    }
}))

app.post('/reg', regValidator, handleValidationErrors, userReg )
app.post('/log', handleValidationErrors, userLog)
app.get('/me', checkSession, userGetInfo)
app.post('/addlog', checkAuth, logAdd)

app.listen(1488, (err) => {
    if  (err) {
        return console.log(err)
    }
    console.log('OK')
})