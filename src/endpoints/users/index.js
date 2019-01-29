import express from 'express'
import model, {createUser} from './model'
const router = express.Router()

router.get('/users', async (req, res) => {
    const data = await model.find()
    res.json(data)
})

router.post('/users', async (req, res) => {
    console.log(req.body)
    const {email, password} = req.body
    try{
        const user = await createUser(email, password)
        console.log(user)
        res.json('posting user')
    }catch(err){
        res.status(400).json(err.message)
    }
    
})

export default router