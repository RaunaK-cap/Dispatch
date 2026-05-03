import { Router } from "express";
import usermiddleware from "../middleware/middleware";
import { config, deliverylogs, notification_message } from "../controllers/content";

const usercontent = Router()

usercontent.post("/config", usermiddleware, config)
usercontent.post("/notification", usermiddleware, notification_message)
usercontent.post("/deliverylogs", usermiddleware, deliverylogs)

export default usercontent