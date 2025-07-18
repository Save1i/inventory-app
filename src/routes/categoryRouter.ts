import { Router } from "express";
import controller from "../controllers/categoryControllers"

const router = Router()

router.get("/", controller.getAllCategories)
router.post("/new", controller.createCategoryNamePost)
router.get("/new", controller.createCategoryNameGet)
router.post("/update", controller.updateCategoryName)
router.post("/delete", controller.deleteCategory)
router.get("/:categoryId", controller.getCategoryItems)

export default router   