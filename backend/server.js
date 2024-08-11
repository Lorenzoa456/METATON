import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import musicRouter from "./routes/musicRouter.js"
const app = express();
dotenv.config();
app.use(morgan('dev'));

app.use("/api/music", musicRouter)

import cors from 'cors';
app.use(cors());

const port = process.env.PORT;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}