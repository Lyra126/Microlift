import express from 'express';
import { getLenders, getBorrowers, getLenderByEmail, getBorrowerByEmail, updateLenderPendingLoans, updateBorrowerPendingLoans, updateLenderConfirmedLoans, updateBorrowerConfirmedLoans, checkLenderExists, checkBorrowerExists, login} from '../controllers/controller.js';
const router = express.Router();

router.route('/getLenders').get(getLenders);
router.route('/getBorrowers').get(getBorrowers);
router.route('/getLenderByEmail').get(getLenderByEmail);
router.route('/getBorrowerByEmail').get(getBorrowerByEmail);
router.route('/updateLenderPendingLoans').post(updateLenderPendingLoans);
router.route('/updateBorrowerPendingLoans').post(updateBorrowerPendingLoans);
router.route('/updateLenderConfirmedLoans').post(updateLenderConfirmedLoans);
router.route('/updateBorrowerConfirmedLoans').post(updateBorrowerConfirmedLoans);
router.route('/checkLenderExists').get(checkLenderExists);
router.route('/checkBorrowerExists').get(checkBorrowerExists);
router.route('/login').get(login);

export default router;

