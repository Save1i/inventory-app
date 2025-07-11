import express from 'express'
const app = express()
const port = 3000

import route from "./src/routes/router"

require("dotenv").config({ debug: true });
import { neon } from "@neondatabase/serverless"
const sql = neon(process.env.DATABASE_URL as string);

app.use(express.json());

app.get('/', async (req, res) => {
  try {
    res.send(`Hello world!`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error querying database');
  }
});

app.use("/", route)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
