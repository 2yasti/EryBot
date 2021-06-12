const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.listen(PORT, () => console.log(`🔥  server aktif pada  port ${PORT}`));
