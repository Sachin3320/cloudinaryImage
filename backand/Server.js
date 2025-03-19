
import express from 'express';
import dotenv from 'dotenv';
import uploadRoutes from './routes/uploadRoutes.js';
import dbConnect from './db.connect/dbConnect.js';
import morgan from 'morgan';
import cors from 'cors';
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cors())
app.use('/api', uploadRoutes);



app.listen(PORT, () => {
  dbConnect()
  console.log(`Server is running on port ${PORT}`);
});
