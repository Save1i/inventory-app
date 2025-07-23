import express from 'express'
import router from "./src/routes/index.ts"
import { neon } from "@neondatabase/serverless"
import path from 'path'
import session from "express-session"
import passport from "passport"
import LocalStrategy from "passport-local"
import db from "./src/db/queries.ts"
import bcrypt from 'bcryptjs'
import pg from 'pg';
import pgSession from "connect-pg-simple";

const app = express()
app.use(express.json());
app.set('views', path.join(__dirname, 'src/views'))
app.set('view engine', 'ejs')

app.use(passport.session());
app.use(express.urlencoded({ extended: true }));

const port = 3000

const { Pool } = pg;

const pgPool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const PgSession = pgSession(session);

import { config } from 'dotenv';
config();
const sql = neon(process.env.DATABASE_URL as string);

interface User {
  id: string | number;
  username: string;
  password: string;
}

app.use(session({
    store: new PgSession({
    pool: pgPool,
    tableName: 'session',
  }),
  secret: process.env.FOO_COOKIE_SECRET,
  resave: false,
  saveUninitialized: false, 
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
}));

app.get('/', async (req, res) => {
  try {
    res.send(`Hello world!`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error querying database');
  }
});

app.use("/", router)

passport.use(
  new LocalStrategy(async (username: string, password: string, done) => {
    try {
      const rows  = await db.getUser(username)
      const user = rows[0];

      const match = await bcrypt.compare(password, user.password)

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch(err) {
      return done(err);
    }
  })
);

passport.serializeUser((user: Express.User, done) => {
    done(null, (user as any).id);
});

passport.deserializeUser(async (id: number, done) => {
    try {
        const user = await db.getUserById(id); // Replace with your DB method
        if (!user) {
            return done(null, false); // User not found
        }
        done(null, user); // Success
    } catch (err) {
        done(err); // Error
    }
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
