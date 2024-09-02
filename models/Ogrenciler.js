const mongoose = require("mongoose");

const ogrencilerSchema = new mongoose.Schema({
    Adi_Soyadi: { type: String, required: false },
    Kayitli_Oldugu_Kurum: { type: String, required: false },
    Kayitli_Oldugu_Program: { type: String, required: false },
    Kayitli_oldugu_Sinif: { type: String, required: false },
    Yerlestigi_Yil: { type: String, required: false },
    Puani: { type: String, required: false },
    PuanTuru: { type: String, required: false },
    NotSisteni: { type: String, required: false },
    AGNO: { type: String, required: false },
    Basvurdugu_Program: { type: String, required: false },
    Basvurdugu_OgretimTuru: { type: String, required: false },
    Basvurdugu_Sinif: { type: String, required: false },
    dosyalar: [{
        dosyaAdi: {
            type: String,
            required: false
        },
        dosyaYolu: {
            type: String,
            required: false
        }
    }]

});

const ogrenciler = mongoose.model('ogrenciler', ogrencilerSchema);
module.exports = ogrenciler;