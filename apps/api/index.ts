import express from "express"
import dotenv from "dotenv"
import auth from "./routes/userauth"
import usercontrols from "./routes/usercontrol"
import cors from "cors"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors())
app.use("/api/v1/auth", auth)
app.use("/api/v1/content", usercontrols)


app.get("/health", (req, res) => {
    res.send("server is running hehehe")
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})

