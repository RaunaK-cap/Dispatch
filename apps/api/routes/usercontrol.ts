import { Router } from "express";
import usermiddleware from "../middleware/middleware";
import { content } from "../controllers/content";

const usercontent = Router()

usercontent.post("/content", usermiddleware, content)

export default usercontent