const express = require('express');
const router = express.Router();
const fs = require('fs');
const tabanpuanlari = require('../models/TabanPuanlari');

router.post('/', async (req, res) => {
    try {
        await tabanpuanlari.deleteMany({});

        const data = fs.readFileSync('../backend/bolumpuan.json', 'utf8');
        const jsonData = JSON.parse(data);

        await tabanpuanlari.insertMany(jsonData);
        res.send('Veritabanı başarıyla sıfırlandı ve güncellendi.');
    } catch (err) {
        console.error('Veritabanını sıfırlama hatası:', err);
        res.status(500).send('Veritabanını sıfırlama hatası:' + err.message);
    }
});

router.get('/bolumler', async (req, res) => {
    try {
        // Veritabanından bölüm bilgilerini çek
        const bolumler = await tabanpuanlari.distinct('BÖLÜMLER'); 
        res.json(bolumler);
    } catch (err) {
        console.error("Veritabanı hatası:", err);
        res.status(500).json({ message: "Sunucu hatası" });
    }
});

router.get('/yillar', async (req, res) => {
    try {
        // Veritabanındaki yılları çek
        const yillar = Object.keys(tabanpuanlari.schema.paths).filter(path => path.startsWith('TabanPuani')).map(year => year.slice(-4));
        res.json(yillar);
    } catch (err) {
        console.error("Veritabanı hatası:", err);
        res.status(500).json({ message: "Sunucu hatası" });
    }
});

router.get('/:bolum/:yil', async (req, res) => {
    const { bolum, yil } = req.params;
    try {
        const tabanPuanlari = await tabanpuanlari.findOne({ BÖLÜMLER: bolum });
        if (!tabanPuanlari) {
            return res.status(404).json({ message: "Bölüm bulunamadı" });
        }
        const tabanPuani = tabanPuanlari[`TabanPuani${yil}`];
        if (!tabanPuani) {
            return res.status(404).json({ message: "Taban puanı bulunamadı" });
        }
        res.json({ bolum, yil, tabanPuani });
    } catch (err) {
        console.error("Veritabanı hatası:", err);
        res.status(500).json({ message: "Sunucu hatası" });
    }
});

module.exports = router;
