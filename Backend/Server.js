import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './Config/db.js';
import userRoutes from './Routes/userRoutes.js';
import adminRoutes from './Routes/adminRoute.js';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './Middleware/errorMiddleware.js';
import path from 'path';
import uploadRoutes from './Routes/uploadRoutes.js';
import { fileURLToPath } from 'url';


const _filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(_filename);

dotenv.config();

connectDB();

const app = express();

const port = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: 'http://localhost:3000' }));

app.use(cookieParser());
app.use('/api/users', userRoutes);
app.use('/api/users', adminRoutes);

app.use('/uploads', express.static(path.join(__dirname, '../Frontend/public/uploads')));
app.use('/api/upload', uploadRoutes);

app.get('/', (req, res) => res.send('Server is ready'));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));