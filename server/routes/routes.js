import express from 'express';
import { getLenders, getBorrowers, createLender, createBorrower, getPersonById} from '../controllers/controller.js';
const router = express.Router();

router.route('/getLenders').get(getLenders);
router.route('/getBorrowers').get(getBorrowers);
router.route('/createLender').post(createLender);
router.route('/createLender').post(createBorrower);
router.route('/:id').get(getPersonById);

export default router;

