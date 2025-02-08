import mongoose from "mongoose";

const LenderSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true}, 
    name: {type: String, required: true}, 
    email: {type: String, required: true}, 
    password: {type: String, required: true},
    businessName: {type: String, required: true},
    contributions: {type: Array, required: true},
    totalContributed: {type: Number, required: true},
    pendingLoans: {type: Array, required: true},
    confirmedLoans: {type: Array, required: true},

}); 

const LenderModel = mongoose.model('lender', LenderSchema);

export default LenderModel;

