import express from 'express'
import bodyParser from 'body-parser'
import db from './db'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import users from './endpoints/users'

const app = express()
const apiversion = 0

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'https://a9cd1745.ngrok.io');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(cookieParser())
app.use(bodyParser.json())

app.use(`/api/v${apiversion}/`, users)

app.listen(3000, () => console.log('listening...'))
