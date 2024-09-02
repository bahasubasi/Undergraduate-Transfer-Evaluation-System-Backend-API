const mongoose = require("mongoose");

const ogrenciDosyalarSchema = new mongoose.Schema({
    ogrenciId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ogrenciler', required: true },
    dosyaAdi: { type: String, required: false },
    dosyaYolu: { type: String, required: false }
});

const OgrenciDosyalar = mongoose.model('OgrenciDosyalar', ogrenciDosyalarSchema);
module.exports = OgrenciDosyalar;
