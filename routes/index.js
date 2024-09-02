const express = require("express");
const router = express.Router();

// Diğer rota dosyalarını içe aktarıyoruz
const OgrencilerRoute = require("./OgrencilerRoutes.js");
const TabanPuanlariRoute = require("./TabanPuanlariRoutes.js");
const UserloginRoute = require("./UserLoginRoutes.js");

// Her rotayı ilgili yol altında kullanıyoruz
router.use("/ogrenciler", OgrencilerRoute);
router.use("/tabanpuanlari", TabanPuanlariRoute);
router.use("/userlogin", UserloginRoute);

module.exports = router;