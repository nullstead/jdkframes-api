import express from 'express';
import multer from 'multer';
import imageRoutes from './routes/imageRoutes.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

// Configure multer for memory storage (needed for S3 upload)
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit
});

app.use(express.json());

// Make multer available to routes
app.use((req, res, next) => {
  req.upload = upload;
  next();
});

//Root routes
app.get('/', (req, res) => {
    res.json({"Info": "Welcome to John Kponyo's photo gallery...!"});
})

// Routes
app.use('/api/images', imageRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});