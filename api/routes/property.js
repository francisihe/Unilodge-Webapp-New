import express from 'express'
//import { createProperty, deleteProperty, getAllProperties, getProperty, updateProperty } from '../controllers/propertyController.js'
import { getAllProperties, getProperty, createProperty, updateProperty, deleteProperty } from '../controllers/propertyController.js'
import { verifyUser } from '../middlewares/verifyUser.js'
import { verifyManagerOrAdmin } from '../middlewares/verifyManagerOrAdmin.js'
import { verifyAdmin } from '../middlewares/verifyAdmin.js'

const router = express.Router()

// Routes and Controllers
router.route('/all')
    .get(getAllProperties)

router.route('/:id')
    .get(getProperty)

router.route('/create')
    .post(verifyManagerOrAdmin, createProperty)

router.route('/:id')
    .delete(verifyManagerOrAdmin, deleteProperty)

export default router;