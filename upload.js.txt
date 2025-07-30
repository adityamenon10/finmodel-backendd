import express from 'express';
import multer from 'multer';
import XLSX from 'xlsx';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Upload and parse Excel/CSV
router.post('/', upload.single('file'), (req, res) => {
    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    res.json({ data });
});

export default router;
