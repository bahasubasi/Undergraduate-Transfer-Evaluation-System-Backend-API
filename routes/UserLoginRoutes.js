const express = require('express');
const router = express.Router();
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/UserLogin'); // User modelini dahil edin, bu örnek modeldir, kendi modelinize uygun değiştirin
const TOKEN_SECRET = "aa"; // Sabit gizli anahtar

// JSON dosyasının yolu
const jsonFilePath = '../backend/kullanıcı.json';

// Kullanıcıları JSON dosyasından veritabanına kaydet




router.post('/', async (req, res) => {
    try {
        // Kullanıcıyı veritabanında bul
        const user = await User.findOne({ username: req.body.username });

        // Kullanıcı mevcut değilse hata dön
        if (!user) return res.status(400).send('Bu kullanıcı adı mevcut değil!');

        // Şifre doğrulaması yap
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) return res.status(400).send('Girilen bilgiler hatalı!');

        // Usertype kontrolü yap
        if (user.userType !== req.body.userType) {
            return res.status(400).send('Girilen bilgiler hatalı!');
        }

        res.send(user.userType)
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
