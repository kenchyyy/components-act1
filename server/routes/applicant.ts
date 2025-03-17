import {
    getApplicants,
    getOneApplicant,
    addApplicant,
    deleteApplicant,
    updateApplicant
} from '../controllers/applicant';

import express from 'express';

const router = express.Router();

router.route('/').get(getApplicants).post(addApplicant);
router.route('/:id').get(getOneApplicant).delete(deleteApplicant).put(updateApplicant);

export default router