import User from './model'
import bcrypt from 'bcrypt'

function hash_pass(password){
    return bcrypt.hash(password, 10).then((hash) => hash)
}

function compare_pass(password, hash){
    return bcrypt.compare(password, hash).then((bool) => bool)
}

export async function userCheck(email, password){
    const user = await User.findOne({email: email})
    if(user){
        const {password_hash} = user
        const passwordMatch = await compare_pass(password, password_hash)
        if(passwordMatch){
            return user
        }else {
            return false
        }
    }else{
        throw new Error("User not found")
    } 
}

export async function createUser(email, password) {
    const password_hash = await hash_pass(password)
    const user = new User({
        email,
        password_hash
    })
    try{  
        return await user.save() 
    }catch(err) {
        throw new Error(err.message)
    }
}

export async function deleteUser(id){
    try{
        const user = await User.findOneAndDelete({ _id: id })
    }catch(err){
        throw new Error(err.message)
    }
}
