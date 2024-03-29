import express from 'express';
const router = express.Router();

import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage }).single('image');

import Parser from 'datauri/parser.js';
const dUri = new Parser();

import path from 'path';

import cloudinary from 'cloudinary';



const dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

router.post('/images',  upload, async (req, res) => {
  try {
    const file = dataUri(req).content;
    const result = await cloudinary.v2.uploader.upload(file, { folder: req.body.folderName });
    res.send(result.url);
  }
  catch (error) {
    console.error('Uploading image failed', error);
    res.status(500).send({ error: 'Uploading image failed!' });
  }
});
  
export default router;
