import {Router} from "express"
import categoryRouter from "./categoryRouter"
import itemRouter from "./itemRouter"
import userRouter from "./userRouter"

const router = Router()

router.use("/category", categoryRouter)
router.use("/item", itemRouter)
router.use("/user", userRouter)

export default router;