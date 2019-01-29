import express from 'express'
import model from './model'
import {createUser, deleteUser, userCheck} from './helpers'
import jwt from 'jsonwebtoken'
import authenticate from '../../middleware/authentication'
const secret = process.env.JWTSECRET || 'unsecureaf' // don't use this in real application

const router = express.Router()

router.get('/users',authenticate, async (req, res) => {
    const data = await model.find({}, 'email')
    res.json(data)
})

router.post('/users', async (req, res) => {
    const {email, password} = req.body
    try{
        const user = await createUser(email, password)
        res.json({
            _id: user._id,
            email: user.email
        })
    }catch(err){
        res.status(400).json(err.message)
    } 
})

router.delete('/users/:id', async (req, res) => {
    const {id} = req.params
    try{
        const user = await deleteUser(id)
        
        res.json("user deleted")
    }catch(err){
        res.status(400).json(err.message)
    } 
})

router.post('/login', async (req, res) => {
    const {email, password} = req.body
    try{
        const user = await userCheck(email, password)
        if(user){
            const token = jwt.sign({ id: user._id }, secret);
            res.cookie('auth_token', token, { expires: new Date(Date.now() + 900000), httpOnly: true });
            res.json({
                _id: user._id,
                email: user.email
            })
        }
    }catch(err){
        res.status(400).json(err.message)
    } 
})

export default router