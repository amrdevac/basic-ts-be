import { Router } from "express";
import {
  getNamaOrang,
  saveNamaOrang,
} from "../controllers/NamaOrang/controller";
import { logsToFileMiddleware } from "../middleware/loging";

const router = Router();
router.use(logsToFileMiddleware);

router.get("/orang", getNamaOrang);
router.post("/orang", saveNamaOrang);

export default router;
