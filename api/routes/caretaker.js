import express from 'express';
import { verifyManagerOrAdmin } from '../middlewares/verifyManagerOrAdmin.js';
import { createCaretaker, deleteCaretaker, getAllCaretakers, getCaretaker, updateCaretaker } from '../controllers/caretakerController.js';
import { getCaretakerByIdentifier } from '../middlewares/getCaretakerByIdentifier.js';
const router = express.Router();

// Routes and Controllers
router.route('/all')
    .get(verifyManagerOrAdmin, getAllCaretakers)

router.route('/:caretakerId')
    .get(verifyManagerOrAdmin, getCaretakerByIdentifier, getCaretaker)

router.route('/create')
    .post(verifyManagerOrAdmin, createCaretaker)

router.route('/:caretakerId')
    .patch(verifyManagerOrAdmin, getCaretakerByIdentifier, updateCaretaker)

router.route('/:caretakerId')
    .delete(verifyManagerOrAdmin, getCaretakerByIdentifier, deleteCaretaker)

export default router;