import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import UserRoutes from "./routes/userRoutes"
const app = express()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3009 

app.use("/", UserRoutes)

const start = async (): Promise<void> => {
    try {
      app.listen(PORT, () => {
        console.log(
          `listing to PORT: ${PORT} \n Connection to DB SUCCESS!`,
        )
      })
    } catch {
      console.error("Failed connection to DB")
    }
  }
  
  start()
  