import {Router} from "express"
import categoryRouter from "./CategoryRouter"
import itemRouter from "./itemRouter"

const router = Router()

router.use("/category", categoryRouter)
router.use("/item", itemRouter)

export default router;