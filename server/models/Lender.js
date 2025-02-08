import mongoose from "mongoose";

const LenderSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    businessName: {type: String, required: true},
    contributions: {type: Array, required: true},
    totalContributed: {type: Number, required: true},
    activeLoans: {type: Number, required: true},

}); 

const LenderModel = mongoose.model('lender', LenderSchema);

export default LenderModel;

