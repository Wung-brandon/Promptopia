import { Schema, model, models } from "mongoose"

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exists"]
    },
    username: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exists"],
        
    },
    image: {
        type: String,
    }
})

// check if a model named User exists if not, create a new one
const User = models.User || model("User", UserSchema)

export default User