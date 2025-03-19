import express from 'express';
import uploadProduct from '../Controller/uploadController.js';
import { upload } from '../middleware/multer.js';

const router = express.Router();

// POST route to handle product form submission
router.post('/upload', upload.fields([{ name: 'bannerImage' }, { name: 'images' }]), uploadProduct);

export default router;
