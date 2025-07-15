import express from 'express'
import router from "./src/routes/index.ts"
import { neon } from "@neondatabase/serverless"
import path from 'path'

const app = express()
app.use(express.json());
app.set('views', path.join(__dirname, 'src/views'))
app.set('view engine', 'ejs')

const port = 3000

require("dotenv").config({ debug: true });
const sql = neon(process.env.DATABASE_URL as string);

app.get('/', async (req, res) => {
  try {
    res.send(`Hello world!`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error querying database');
  }
});

app.use("/", router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
