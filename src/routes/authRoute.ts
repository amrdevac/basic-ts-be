import { Router } from "express";
import { logsToFileMiddleware } from "../middleware/loging";
import { authentication } from "../controllers/Auth/controller";

const router = Router();
router.use(logsToFileMiddleware);

router.post("/jwt", authentication);

export default router;
