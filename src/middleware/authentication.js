const secret = process.env.JWTSECRET || 'unsecureaf' // don't use this in real application
import jwt from 'jsonwebtoken'

export default async function authenticate(req,res,next){
    console.log('name')
    const token = req.cookies.auth_token
    try{
        const {id} = await jwt.verify(token, secret);
        req.current_user = id
        next()
    }catch(e){
        res.status(401).json({message: "unauthorised"})
    }
}