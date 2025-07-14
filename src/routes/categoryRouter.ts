import { Router } from "express";
import controller from "../controllers/categoryControllers"

const router = Router()

router.post("/new", controller.createCategoryName)
router.post("/update", controller.updateCategoryName)
router.post("/delete", controller.deleteCategory)
router.get("/", controller.getAllCategories)

export default router   