import { Router } from "express";
import controller from "../controllers/controller"

const route = Router()

route.post("/new-category", controller.createCategoryName)
route.post("/update-category", controller.updateCategoryName)
route.post("/delete-category", controller.deleteCategory)

export default route