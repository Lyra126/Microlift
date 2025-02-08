import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    id: {type: String, required: false},
    type: {type: Boolean, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
}); 

const UserModel = mongoose.model('user', UserSchema);

export default UserModel;

