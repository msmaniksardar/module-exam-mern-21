import app from "./app.js";
import { SERVER_PORT } from "./src/config/config.js";


app.listen(SERVER_PORT, () => {
    console.log(`SERVER IS RUNNING AT http://localhost:${SERVER_PORT}`);

})