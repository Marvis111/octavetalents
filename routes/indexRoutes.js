const {Router} = require('express')

const indexRouter = Router();

const {index} = require('../controllers/indexController');

indexRouter.get('/',index);

module.exports = indexRouter