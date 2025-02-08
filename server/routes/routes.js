import express from 'express';
import { getLenders, getBorrowers, getLenderByEmail, getBorrowerByEmail, updateLenderPendingLoans, updateBorrowerPendingLoans, createLender, createBorrower, getPersonById, updateLenderConfirmedLoans, updateBorrowerConfirmedLoans, checkLenderExists, checkBorrowerExists} from '../controllers/controller.js';
const router = express.Router();

router.route('/getLenders').get(getLenders);
router.route('/getBorrowers').get(getBorrowers);
router.route('/getLenderByEmail').get(getLenderByEmail);
router.route('/getBorrowerByEmail').get(getBorrowerByEmail);
router.route('/updateLenderPendingLoans').post(updateLenderPendingLoans);
router.route('/updateBorrowerPendingLoans').post(updateBorrowerPendingLoans);
router.route('/createLender').post(createLender);
router.route('/createLender').post(createBorrower);
router.route('/:id').get(getPersonById);
router.route('/updateLenderConfirmedLoans').post(updateLenderConfirmedLoans);
router.route('/updateBorrowerConfirmedLoans').post(updateBorrowerConfirmedLoans);
router.route('/checkLenderExists').get(checkLenderExists);
router.route('/checkBorrowerExists').get(checkBorrowerExists);


export default router;

