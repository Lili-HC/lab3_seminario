var express = require('express');
var router = express.Router();
var ServicesController = require('../controller/ServicesController');
//const { router } = require('../app.js');
var services = new ServicesController();
router.get('/', services.index);
//router.get('/test', services.test);
router.post('/test', services.test);
module.exports = router;
//rutas de Desafios
router.post('/divisas',services.divisas);