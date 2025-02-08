import LenderModel from "../models/Lender.js";
import BorrowerModel from "../models/Borrower.js";

const getLenders = async (req, res) => {
    try {
        const lenders = await LenderModel.find();
        res.json(lenders);
    } catch (error) {
        // Handle any errors
        res.status(500).json({ error: 'Failed to fetch lenders' });
    }
};

const getBorrowers = async (req, res) => {
    try {
        const borrowers = await BorrowerModel.find();
        res.json(borrowers);
    } catch (error) {
        // Handle any errors
        res.status(500).json({ error: 'Failed to fetch borrowers' });
    }
};

const getLenderByEmail = async (req, res) => {
    try {
        const { email } = req.query;
        const data = await LenderModel.find();
        const lender = data.find(lender => lender.email === email);
    
        if (!lender) {
            return res.status(404).json({ error: 'Lender not found' });
        }
        res.json(lender);
    } catch (error) {
        // Handle any errors
        res.status(500).json({ error: 'Failed to fetch lender' });
    }
};


const getBorrowerByEmail = async (req, res) => {
    try {
        const { email } = req.query;
        const data = await BorrowerModel.find();
        const borrower = data.find(borrower => borrower.email === email);
        
        console.log(borrower);
        if (!borrower) {
            return res.status(404).json({ error: 'Borrower not found' });
        }
        res.json(borrower);
    } catch (error) {
        // Handle any errors
        res.status(500).json({ error: 'Failed to fetch borrower' });
    }
};

const updateLenderPendingLoans = async (req, res) => {
    try {
        const {email, businessName, loan, cut } = req.body;

        const lender = await LenderModel.findOne({ email });
        const newLoan = {
            businessName,
            loan,
            cut
        };

        // Push the new loan tuple to the pendingLoans array
        lender.pendingLoans.push(newLoan);

        // Save the updated lender back to the database
        await lender.save();
        if (!lender) {
            return res.status(404).json({ error: 'Lender not found' });
        }
    
        res.json(lender);
    } catch (error) {
        // Handle any errors
        res.status(500).json({ error: 'Failed to fetch lender' });
    }
};

const updateBorrowerPendingLoans = async (req, res) => {
    try {
        const {email, businessName, loan, cut } = req.body;

        const borrower = await BorrowerModel.findOne({ businessName });
        const newLoan = {
            email,
            loan,
            cut
        };

        // Push the new loan tuple to the pendingLoans array
        borrower.pendingLoans.push(newLoan);

        // Save the updated borrower back to the database
        await borrower.save();
        if (!borrower) {
            return res.status(404).json({ error: 'Borrower not found' });
        }
    
        res.json(borrower);
    } catch (error) {
        // Handle any errors
        res.status(500).json({ error: 'Failed to fetch borrower' });
    }
};




const createLender = async (req, res) => {
};


const createBorrower = async (req, res) => {
};

const getPersonById = async (req, res) => {
};

export{
    getLenders,
    getBorrowers,
    createLender,
    createBorrower,
    getPersonById,
    getLenderByEmail,
    getBorrowerByEmail,
    updateLenderPendingLoans,
    updateBorrowerPendingLoans
}