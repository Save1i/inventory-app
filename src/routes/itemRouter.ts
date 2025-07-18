import { Router } from "express";
import controller from "../controllers/itemControllers"

const router = Router()

router.get("/", controller.getAllItems)
router.post("/new", controller.insertItemPost)
router.get("/new", controller.insertItemGet)
router.get("/:itemId/update", controller.getItemForUpdate)
router.get("/:itemId", controller.getItem)
router.post("/:itemId/update", controller.updateItem)
router.post("/delete", controller.deleteItem)


export default router;