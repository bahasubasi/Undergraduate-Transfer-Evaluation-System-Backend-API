const mongoose = require("mongoose");

const tabanpuanlariSchema = new mongoose.Schema({
    KODU: { type: String, required: false },
    BÖLÜMLER: { type: String, required: true },
    TabanPuani2023: { type: String, required: true },
    TabanPuani2022: { type: String, required: true },
    TabanPuani2021: { type: String, required: true },
    TabanPuani2020: { type: String, required: true },
    TabanPuani2019: { type: String, required: true },
    TabanPuani2018: { type: String, required: true },
    TabanPuani2017: { type: String, required: true },
    TabanPuani2016: { type: String, required: true },
    TabanPuani2015: { type: String, required: true },
    TabanPuani2014: { type: String, required: true },
    TabanPuani2013: { type: String, required: true },
    TabanPuani2012: { type: String, required: true },
    TabanPuani2011: { type: String, required: true },
    TabanPuani2010: { type: String, required: true },
    TabanPuani2009: { type: String, required: true },
    TabanPuani2008: { type: String, required: true },
    TabanPuani2007: { type: String, required: true },
    TabanPuani2006: { type: String, required: true },
    TabanPuani2005: { type: String, required: true },
    TabanPuani2004: { type: String, required: true },
    TabanPuani2003: { type: String, required: true },
    TabanPuani2002: { type: String, required: true },
    TabanPuani2001: { type: String, required: true },
    TabanPuani2000: { type: String, required: true },
});

const tabanpuanlari = mongoose.model('tabanpuanlari', tabanpuanlariSchema);
module.exports = tabanpuanlari;