import { Router } from 'express'
import bookRoute from './book.route.js'

const router = Router()
router.use(`/book`,bookRoute)

export default router

