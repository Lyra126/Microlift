import UserModel from "../models/user.js";

const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.json(users);
    } catch (error) {
        // Handle any errors
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

const getUserByEmailAndPassword = async (req, res) => {
    try {
        const { email, password } = req.query;
        const user = await UserModel.findOne({ email, password });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        // Handle any errors
        res.status(500).json({ error: 'Failed to fetch user' });
    }
};

const createUser = async (req, res) => {
    try {
        const { tree_type, email_address, name, password } = req.body;
        
        // Create a new user instance
        const user = new UserModel({ 
            tree_type,
            email_address,
            name,
            password
        });

        // Save the user to the database
        await user.save();

        // Send the newly created user object as a response
        res.json(user);
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ error: 'Failed to create user' });
    }
};

const getUserById = async (req, res) => {};

const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.query;
        const user = await UserModel.findOne({ email_address: email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        // Handle any errors
        res.status(500).json({ error: 'Failed to fetch user' });
    }
};

const getAllEntries = async (req, res) => {
    try {
        const entries = await UserModel.find({}, 'entries');
        res.json(entries);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch entries' });
    }
};

const addNewEntry = async (req, res) => {
    try {
        const { email, entry } = req.body; // Use req.body to access JSON data
        const user = await UserModel.findOne({ email_address: email });

        // Log incoming request for debugging
        console.log("Received request body:", { email, entry });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.entries.push(entry); // Make sure to push the entry, not address
        await user.save();

        res.json({ message: 'Entry saved successfully', entries: user.entries }); // Return the updated entries
    } catch (error) {
        console.error("Error saving entry:", error);
        res.status(500).json({ error: 'Failed to add entry' });
    }
};




export{
    getAllUsers,
    createUser,
    getUserById,
    getUserByEmailAndPassword,
    getUserByEmail,
    getAllEntries,
    addNewEntry
}