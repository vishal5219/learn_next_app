import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema({
    email: {
        type: String,
        require: [true, 'email is required'],
        unique: [true, 'email alrady exist'],
    },
    name: {
        type: String,
        require: [true, 'name is required']
    },
    image: {
        type: String
    }
})

const User = models.User || model('User', UserSchema)
export default User