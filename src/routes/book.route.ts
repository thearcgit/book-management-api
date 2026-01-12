import { upload } from "@/middlewares/import.middleware.js";
import { Router } from "express";
import { addBook, bulkUpload, deleteBook, getAllBook, specificBook, updateBook } from "@/controllers/book.controller.js";

const router = Router()

router.post(`/`,addBook)
router.get(`/`,getAllBook)
router.get(`/:id`,specificBook)
router.put(`/:id`,updateBook)
router.delete(`/:id`,deleteBook)
router.post(`/import`,upload.single('csv'),bulkUpload)

export default router