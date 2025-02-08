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

const createLender = async (req, res) => {
};


const createBorrower = async (req, res) => {
};

const getPersonById = async (req, res) => {
};
// const createTip = async (req, res) => {
//     try {
//         const tip = new TipModel({ 
//             id: req.body.id,
//             tip: req.body.tip,
//         })
//         await tip.save();
//         res.json(tip);
//     } catch (error) {
//         // Handle any errors
//         res.status(500).json({ error: 'Failed to create tip' });
//     }
// };

export{
    getLenders,
    getBorrowers,
    createLender,
    createBorrower,
    getPersonById
}