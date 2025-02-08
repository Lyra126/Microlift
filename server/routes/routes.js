import express from 'express';
import { getLenders, getBorrowers, getLenderByEmail, getBorrowerByEmail, updateLenderLoans, createLender, createBorrower, getPersonById} from '../controllers/controller.js';
const router = express.Router();

router.route('/getLenders').get(getLenders);
router.route('/getBorrowers').get(getBorrowers);
router.route('/getLenderByEmail').get(getLenderByEmail);
router.route('/getBorrowerByEmail').get(getBorrowerByEmail);
router.route('/updateLenderLoans').post(updateLenderLoans);
router.route('/createLender').post(createLender);
router.route('/createLender').post(createBorrower);
router.route('/:id').get(getPersonById);

export default router;

