import mongoose from "mongoose";

const BorrowerSchema = new mongoose.Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    phoneNumber: {type: String, required: false},
    businessName: {type: String, required: true},
    businessIdea: {type: String, required: true},
    industry: {type: String, required: false},
    loans: {type: String, required: true},

}); 

const BorrowerModel = mongoose.model('borrower', BorrowerSchema);

export default BorrowerModel;

