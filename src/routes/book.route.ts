import { addBook } from "@/controllers/book.controller.js";
import { Router } from "express";

const router = Router()

router.post(`/`,addBook)

export default router