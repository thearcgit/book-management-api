import app from "./app.js";
import { PORT } from "./config/env.js";

const port = PORT || 8000
app.listen(port,() => {
    console.log(`Server is running at http://localhost:${port}`)
})