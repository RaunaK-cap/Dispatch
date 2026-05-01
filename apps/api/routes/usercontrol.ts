import { Router } from "express";
import usermiddleware from "../middleware/middleware";
import { config, deliverylogs, notification_message } from "../controllers/content";

const usercontent = Router()

usercontent.post("/content/config", usermiddleware, config)
usercontent.post("/content/notification", usermiddleware, notification_message)
usercontent.post("/content/deliverylogs", usermiddleware, deliverylogs)

export default usercontent