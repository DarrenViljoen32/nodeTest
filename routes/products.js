import express from 'express'
import controller from '../controller/products.js'
const router = express.Router()

router 
    .route('/')
            .get(controller.getProds)
            .post(controller.getPost)
            
            
router
    .route('/:id')
            .delete(controller.rmvPost)
            .patch(controller.getPatch)
            .get(controller.getItem)

export default router
