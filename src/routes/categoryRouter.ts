import { Router } from "express";
import controller from "../controllers/categoryControllers"

const router = Router()

router.get("/", controller.getAllCategories)
router.post("/new", controller.createCategoryName)
router.post("/update", controller.updateCategoryName)
router.post("/delete", controller.deleteCategory)

export default router   