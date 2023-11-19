import express from 'express'
import { getAllProperties, getProperty, createProperty, updateProperty, deleteProperty, searchProperties } from '../controllers/propertyController.js'
import { verifyManagerOrAdmin } from '../middlewares/verifyManagerOrAdmin.js'

const router = express.Router()

// Routes and Controllers
router.route('/all')
    .get(getAllProperties)

router.route('/search')
    .get(searchProperties)

router.route('/:propertyId')
    .get(getProperty)

router.route('/create')
    .post(verifyManagerOrAdmin, createProperty)

router.route('/:propertyId')
    .patch(verifyManagerOrAdmin, updateProperty)

router.route('/:propertyId')
    .delete(verifyManagerOrAdmin, deleteProperty)


export default router;