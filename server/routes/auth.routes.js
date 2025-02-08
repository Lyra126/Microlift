import express from 'express';
import Borrower from '../models/Borrower.js';
import Lender from '../models/Lender.js';

const authRouter = express.Router();

authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const borrower = await Borrower.findOne({ email });
        const lender = await Lender.findOne({ email });
        const user = borrower || lender;

        if (user && user.password === password) {
            return res.status(200).json({ message: "Login successful" });
        } else {
            return res.status(401).json({ message: "Incorrect email or password" });
        }
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Server error" });
    }
});

export default authRouter;
