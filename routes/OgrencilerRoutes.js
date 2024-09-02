const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');
const ogrenciler = require('../models/Ogrenciler');

router.get('/', async (req, res) => {
    try {
        const students = await ogrenciler.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', upload.single('file'), async (req, res) => {
    try {
        await ogrenciler.deleteMany({});
        console.log('Veritabanı başarıyla temizlendi');

        const workbook = xlsx.readFile(req.file.path);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = xlsx.utils.sheet_to_json(worksheet); 

        // Veritabanı şemasındaki alan adları
        const schemaKeys = Object.keys(ogrenciler.schema.obj);
        const data = [];

        // Döngü ile her bir satırı işle
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const newRow = {};
            // Her bir sütunu, veritabanı şemasındaki alan adlarına eşleştir
            Object.keys(row).forEach((key, index) => {
                const schemaKey = schemaKeys[index];
                if (schemaKey) {
                    newRow[schemaKey] = row[key];
                }
            });
            data.push(newRow);
        }

        // Döngü ile her bir satırı veritabanına ekle
        for (let i = 0; i < data.length; i++) {
            await ogrenciler.create(data[i]);
        }

        res.send('Dosya başarıyla yüklendi ve veriler MongoDB\'ye eklendi.');
    } catch (error) {
        console.error('Dosya yükleme ve veri ekleme hatası:', error);
        res.status(500).send('İç Sunucu Hatası');
    }
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const updatedStudent = await ogrenciler.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await ogrenciler.findByIdAndDelete(req.params.id);
        res.status(200).send('Öğrenci başarıyla silindi.');
    } catch (error) {
        console.error('Öğrenci silme hatası:', error);
        res.status(500).send('Öğrenci silinirken bir hata oluştu.');
    }
});

// Dosya yükleme işlemi
router.post('/dosyalar', upload.single('file'), async (req, res) => {
    try {
        const studentId = req.body.studentId; // Öğrenci kimliğini al

        // Öğrenci kimliği yoksa hata döndür
        if (!studentId) {
            return res.status(400).send('Öğrenci kimliği eksik');
        }

        const student = await ogrenciler.findById(studentId);

        // Öğrenci bulunamazsa hata döndür
        if (!student) {
            return res.status(404).send('Öğrenci bulunamadı');
        }

        // Dosyayı /uploads dizinine taşı
        const file = req.file;
        const filePath = path.join(__dirname, '..', 'uploads', file.originalname);
        fs.renameSync(file.path, filePath);

        if (!student.dosyalar) {
            student.dosyalar = [];
        }

        // Dosya bilgilerini veritabanına kaydet
        const newFile = {
            dosyaAdi: file.originalname,
            dosyaYolu: filePath
        };
        student.dosyalar.push(newFile); // Dosya bilgisini öğrenci dosyalarına ekle
        await student.save(); // Veritabanını güncelle

        res.send('Dosya başarıyla yüklendi ve veritabanına kaydedildi');
    } catch (error) {
        console.error('Dosya yükleme hatası:', error);
        res.status(500).send('Dosya yükleme hatası');
    }
});

router.get('/dosyalar', async (req, res) => {
    try {
        const students = await ogrenciler.find();
        const fileNames = {};
        students.forEach(student => {
            fileNames[student._id] = student.dosyalar.map(dosya => dosya.dosyaAdi);
        });
        res.json(fileNames);
    } catch (error) {
        console.error('Dosya adlarını alma hatası:', error);
        res.status(500).send('Dosya adlarını alma hatası');
    }
});

router.get('/dosyalar/:dosyaAdi', (req, res) => {
    const dosyaAdi = req.params.dosyaAdi;
    const dosyaDizini = path.join(__dirname, '../uploads');
    const dosyaYolu = path.join(dosyaDizini, dosyaAdi);
    res.sendFile(dosyaYolu);
});

module.exports = router;