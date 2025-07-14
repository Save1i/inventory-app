import {Router} from "express"
import categoryRouter from "./categoryRouter"
import itemRouter from "./itemRouter"

const router = Router()

router.use("/category", categoryRouter)
router.use("/item", itemRouter)

export default router;