import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';


const _filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(_filename);

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../Frontend/public/uploads'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});

const fileFilter = (req, file, cb) => {
    const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Error: Images only!');
    }
};

const upload = multer({
    storage,
    fileFilter

});

router.post('/', upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }
        res.status(200).json({ path: req.file.filename });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'File upload failed', error: error.message });
    }
});

export default router;