import mongoose from "mongoose";

import BorrowerModel from './Borrower.js';
import LenderModel from './Lender.js';

const UserSchema = new mongoose.Schema({
    id: {type: String, required: false}, 
    type: {type: Boolean, required: true}, // true = borrower, false = lender
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
}); 

UserSchema.post('save', async function (doc, next) {
    try {
        if (doc.type) {
            await BorrowerModel.create({ 
                id: doc._id,
                name: doc.name,
                email: doc.email,
                password: doc.password,
                businessName: "Default Business",
                businessIdea: "Default Idea",
                loans: "None",
                pendingLoans: [],
                confirmedLoans: []
            });
        } else {
            await LenderModel.create({ 
                id: doc._id,
                name: doc.name,
                email: doc.email,
                password: doc.password,
                businessName: "Default Business",
                contributions: [],
                totalContributed: 0,
                pendingLoans: [],
                confirmedLoans: []
            });
        }
        next();
    } catch (error) {
        console.error("Error creating borrower/lender:", error);
        next(error);
    }
});

const UserModel = mongoose.model('user', UserSchema);

export default UserModel;

