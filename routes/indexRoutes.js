const {Router} = require('express')

const indexRouter = Router();

const {index,googleAuth, checkInputs, validateInputs, sendResponse} = require('../controllers/indexController');

indexRouter.get('/',index);
indexRouter.post('/auth/google',googleAuth)
indexRouter.post('/signup',checkInputs,validateInputs,sendResponse);

module.exports = indexRouter