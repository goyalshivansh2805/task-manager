const {model,Schema} = require('mongoose');


const UserSchema = new Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        refreshToken:{
            type:String
        }
    }
)

module.exports = User = model('User',UserSchema);