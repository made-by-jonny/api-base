import express from 'express'
import db from './db'
import bodyParser from 'body-parser'
import users from './endpoints/users'
const app = express()
const apiversion = 0

app.use(bodyParser.json())

app.use(`/api/v${apiversion}/`, users)

app.listen(3000, () => console.log('listening...'))
