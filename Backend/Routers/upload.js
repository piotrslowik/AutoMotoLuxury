import express from 'express';
const router = express.Router();

import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage }).single('image');

import dUri from 'datauri';

import path from 'path';

import cloudinary from 'cloudinary';



const dataUri = req => dUri(path.extname(req.file.originalname).toString(), req.file.buffer);

router.post('/images',  upload, async (req, res) => {
  try {
    const file = dataUri(req).content;
    const result = await cloudinary.v2.uploader.upload(file);
    res.send(result.url);
  }
  catch (error) {
    console.error('Uploading image failed', error);
    res.status(500).send({ error: 'Uploading image failed!' });
  }
});
  
export default router;
