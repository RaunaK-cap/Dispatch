import { Router } from "express";
import { signin, signup } from "../controllers/user";

const auth = Router()

auth.post("/signup", signup)
auth.post("/signin", signin)

export default auth