const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// ... (konfigurasi multer, bodyParser, cors)

// Endpoint prediksi
app.post('/predict', upload.single('image'), async (req, res) => {
    // ... (logika prediksi, validasi, dan respon)
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

const upload = multer({
    limits: { fileSize: 1000000 }, // Batas ukuran file 1MB
});

app.post('/predict', upload.single('image'), async (req, res) => {
    try {
        // Validasi gambar (misal: periksa ekstensi)
        if (req.file.mimetype !== 'image/jpeg' && req.file.mimetype !== 'image/png') {
            return res.status(400).json({ status: 'fail', message: 'Invalid image format' });
        }

        // Panggil fungsi prediksi (asumsikan fungsi ini sudah ada)
        const result = await predictImage(req.file.path);

        // Bentuk respons
        res.json({
            status: 'success',
            message: 'Model is predicted successfully',
            data: {
                id: uuidv4(),
                result: result.prediction,
                suggestion: result.suggestion,
                createdAt: new Date().toISOString(),
            },
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ status: 'fail', message: 'Terjadi kesalahan dalam melakukan prediksi' });
    }
});