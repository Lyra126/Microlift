import express from 'express';
import { getLenders, getBorrowers, createLender, createBorrower, getPersonById} from '../controllers/controller.js';

const router = express.Router();

//for all users
router.route('/getAll').get(getAllUsers);
router.route('/createUser').post(createUser);
router.route('/user').get(getUserById);
router.route('/get').get(getUserByEmailAndPassword);
router.route('/getUser').get(getUserByEmail);
router.route('/getAllEntries').get(getAllEntries);
router.route('/addNewEntry').post(addNewEntry);


router.route('/getLenders').get(getLenders);
router.route('/getBorrowers').get(getBorrowers);
router.route('/createLender').post(createLender);
router.route('/createLender').post(createBorrower);
router.route('/:id').get(getPersonById);

export default router;