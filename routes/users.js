import express from 'express'
import controller from '../controller/users.js'
const router = express.Router()

router
    .route('/')
            .get(controller.getAllUsers)
            .post(controller.getPost)
         

router
    .route('/:id')
            .delete(controller.rmvPostUser)
            .patch(controller.getPatchUser)
            .get(controller.getUser)

export default router




