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

        const data = await LenderModel.find();
        const lender = data.find(lender => lender.email === email);
        const newLoan = {
            businessName,
            loan,
            cut
        };
        console.log(lender);

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

        const data = await BorrowerModel.find();
        const borrower = data.find(borrower => borrower.businessName === businessName);
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

const updateLenderConfirmedLoans = async (req, res) => {
    try {
        const { email, businessName } = req.body;

        // Find the lender by email
        const lender = await LenderModel.findOne({ email });
        if (!lender) {
            return res.status(404).json({ error: 'Lender not found' });
        }

        // Find the loan object in pendingLoans that matches the given businessName
        const loanIndex = lender.pendingLoans.findIndex(loan => loan.businessName === businessName);

        if (loanIndex === -1) {
            return res.status(404).json({ error: 'Loan with the specified business name not found' });
        }

        // Extract the loan to be moved to confirmedLoans
        const loanToMove = lender.pendingLoans[loanIndex];

        // Remove the loan from pendingLoans
        lender.pendingLoans.splice(loanIndex, 1);

        // Push the loan to confirmedLoans
        lender.confirmedLoans.push(loanToMove);

        // Save the updated lender back to the database
        await lender.save();

        res.json(lender);
    } catch (error) {
        // Handle any errors
        res.status(500).json({ error: 'Failed to update lender loans' });
    }
};

const updateBorrowerConfirmedLoans = async (req, res) => {
    try {
        const { lenderEmail, businessName } = req.body;

        // Find the borrower by business name
        const borrower = await BorrowerModel.findOne({ businessName });
        if (!borrower) {
            return res.status(404).json({ error: 'Borrower not found' });
        }

        // Find the loan object in pendingLoans that matches the given lender's email
        const loanIndex = borrower.pendingLoans.findIndex(loan => loan.lenderEmail === lenderEmail);

        if (loanIndex === -1) {
            return res.status(404).json({ error: 'Loan with the specified lender email not found' });
        }

        // Extract the loan to be moved to confirmedLoans
        const loanToMove = borrower.pendingLoans[loanIndex];

        // Remove the loan from pendingLoans
        borrower.pendingLoans.splice(loanIndex, 1);

        // Push the loan to confirmedLoans
        borrower.confirmedLoans.push(loanToMove);

        // Save the updated borrower back to the database
        await borrower.save();

        res.json(borrower);
    } catch (error) {
        // Handle any errors
        res.status(500).json({ error: 'Failed to update borrower loans' });
    }
};

const checkLenderExists = async (req, res) => {
    try {
        const {email } = req.query;
        const lender = await LenderModel.findOne({email });

        if (lender) {
            res.json(lender);
            return res.status(200).json({ 
                exists: true, 
            });
        } else {
            return res.status(404).json({ exists: false, message: 'Lender not found' });
        }
    } catch (error) {
        console.error("Error checking lender existence:", error);
        return res.status(500).json({ error: 'Server error' });
    }
};

const checkBorrowerExists = async (req, res) => {
    try {
        const { email } = req.query;
        const borrower = await BorrowerModel.findOne({ email });

        if (borrower) {
            return res.status(200).json({ 
                exists: true, 

            });
        } else {
            return res.status(404).json({ exists: false, message: 'Borrower not found' });
        }
    } catch (error) {
        console.error("Error checking borrower existence:", error);
        return res.status(500).json({ error: 'Server error' });
    }
};



const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Initialize variables for borrower and lender
        let borrower = null;
        let lender = null;

        // Try to find the borrower
        borrower = await Borrower.findOne({ email });

        // If borrower found, check password
        if (borrower && borrower.password === password) {
            return res.status(200).json({ message: "Login successful", user: borrower });
        }

        // If borrower not found or password is incorrect, try to find lender
        lender = await Lender.findOne({ email });

        if (lender && lender.password === password) {
            return res.status(200).json({ message: "Login successful", user: lender });
        }

        // If neither borrower nor lender matches, return unauthorized
        return res.status(401).json({ message: "Incorrect email or password" });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};


export{
    getLenders,
    getBorrowers,
    getLenderByEmail,
    getBorrowerByEmail,
    updateLenderPendingLoans,
    updateBorrowerPendingLoans,
    updateLenderConfirmedLoans,
    updateBorrowerConfirmedLoans,
    checkLenderExists,
    checkBorrowerExists,
    login
}