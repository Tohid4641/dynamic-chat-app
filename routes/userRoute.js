const userController = require('../controllers/userController');
const upload = require('../middlewares/multer');

const userRoute = require('express')();

// registration
userRoute.get('/register',upload.single('image'), userController.loadRegister);
userRoute.post('/register',upload.single('image'), userController.register);

// login
userRoute.get('/', userController.loadLogin);
userRoute.post('/', userController.login);

// logout
userRoute.get('/logout', userController.logout);

// dashboard
userRoute.get('/dashboard', userController.loadDashboard);

// redirect to login
userRoute.get('*', function(req, res){
    res.redirect('/');
});

module.exports = userRoute;