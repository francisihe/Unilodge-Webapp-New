import express from 'express'
//import { createProperty, deleteProperty, getAllProperties, getProperty, updateProperty } from '../controllers/propertyController.js'
import { getAllProperties, getProperty, createProperty, updateProperty, deleteProperty } from '../controllers/propertyController.js'
const router = express.Router()

// Routes and Controllers
router.route('/all')
    .get(getAllProperties)

router.route('/create')
    .post(createProperty)

router.route('/:id')
    .get(getProperty)

router.route('/:id')
    .delete(deleteProperty)

export default router;