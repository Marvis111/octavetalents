const {Router} = require('express')

const indexRouter = Router();

const {index,googleAuth} = require('../controllers/indexController');

indexRouter.get('/',index);
indexRouter.post('/auth/google',googleAuth)


module.exports = indexRouter