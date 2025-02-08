import express from 'express';
import { createUser, getAllUsers, getUserById, getUserByEmailAndPassword, getUserByEmail, getAllEntries, addNewEntry} from '../controllers/User.controller.js';
const userRouter = express.Router();

//for all users
userRouter.route('/getAll').get(getAllUsers);
userRouter.route('/createUser').post(createUser);
userRouter.route('/user').get(getUserById);
userRouter.route('/get').get(getUserByEmailAndPassword);
userRouter.route('/getUser').get(getUserByEmail);
userRouter.route('/getAllEntries').get(getAllEntries);
userRouter.route('/addNewEntry').post(addNewEntry);

export default userRouter;
