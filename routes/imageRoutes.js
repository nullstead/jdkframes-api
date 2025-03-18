import express from 'express';
import { 
  uploadImageController, 
  deleteImageController, 
  listImagesController 
} from '../controllers/imageController.js';

const router = express.Router();

// POST /api/images - Upload an image
router.post('/', (req, res, next) => {
  req.upload.single('image')(req, res, (err) => {
    if (err) return next(err);
    uploadImageController(req, res, next);
  });
});

// DELETE /api/images/:key - Delete an image 
router.delete('/:key', deleteImageController);

// GET /api/images - List all images
router.get('/', listImagesController);

export default router;