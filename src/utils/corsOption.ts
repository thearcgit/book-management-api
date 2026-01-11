import { CorsOptions } from "cors"

const corsOptions: CorsOptions = {
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: [
    "Content-Type",
    "Authorization"
  ],
}

export default corsOptions
