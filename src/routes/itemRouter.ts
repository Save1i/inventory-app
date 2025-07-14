import { Router } from "express";
import controller from "../controllers/itemControllers"

const router = Router()

router.post("/new", controller.insertItem)
router.get("/update", controller.getItem)
router.post("/update", controller.updateItem)
router.post("/delete", controller.deleteItem)
router.get("/", controller.getAllItems)

export default router;