import { Router } from "express";
import usermiddleware from "../middleware/middleware";
import { config, delete_config, delete_notification_message, deliverylogs, notification_message } from "../controllers/content";

const usercontent = Router()

usercontent.post("/config", usermiddleware, config)
usercontent.delete("/config/delete", usermiddleware, delete_config)

usercontent.post("/notification", usermiddleware, notification_message)
usercontent.delete("/notification/delete", usermiddleware, delete_notification_message)

usercontent.post("/deliverylogs", usermiddleware, deliverylogs)

export default usercontent