import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {type: String, required: true},
  password_hash: {type: String, required: true}
});

const User = mongoose.model('User', UserSchema);

UserSchema.path('email').validate(async (value) => {
    const user = await User.model('User').find({ email: value })
    if(user.length !== 0) {
        throw new Error('Email already exists')
    }
    return true
}, 'Email already exists')

UserSchema.path('email').validate((value) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(!emailRegex.test(String(value).toLowerCase())) {
        throw new Error('Enter a valid email')
    }else {
        return true
    }
}, 'Enter a valid email')


export default User

