import { Router } from "express";
import {
  login_get,
  login_post,
  signup_get,
  signup_post,
} from "../controllers/authController.js";
import requrieAuth from "../middleware/authMiddleware.js";

const router = Router();

router.get("/signup", signup_get);
router.post("/signup", requrieAuth, signup_post);
router.get("/login", login_get);
router.post("/login", login_post);

export default router;
