const User = require('../models/userModel');
const bcrypt = require('bcrypt');

// registration
const loadRegister = async(req, res) => {
    try {
        res.render('register');
    } catch (error) {
        console.log(error.message);
    }
}

const register = async(req, res) => {
    try {
        const hashPassword = await bcrypt.hash(req.body.password, 10);

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            image:'images/'+req.file.filename,
            password: hashPassword
        });

        await user.save();

        res.render('register', {message: "Your Registration has been successfully!"})
    } catch (error) {
        console.log(error.message);
    }
}

// login
const loadLogin = async(req, res) => {
    try {
        res.render('login');
    } catch (error) {
        console.log(error.message);
    }
}

const login = async(req, res) => {
    try {
        const { email, password } = req.body;

        const userData = await User.findOne({ email:email });

        if(userData){

            const matchPassword = await bcrypt.compare(password, userData.password);
            
            if(matchPassword){
                req.session.user = userData;
                res.redirect('/dashboard');
            }else{
                res.render('login', {message:'Invalid credentials!'})
            };

        }else{
            res.render('login', {message:'Invalid credentials!'})
        };
    } catch (error) {
        console.log(error.message);
    }
}

// logout
const logout = async(req, res) => {
    try {
        req.session.destroy();
        res.redirect('/');
    } catch (error) {
        console.log(error.message);
    }
}


// dashboard
const loadDashboard = async(req, res) => {
    try {
        res.render('dashboard', {user: req.session.user});
    } catch (error) {
        console.log(error.message);
    }
}


module.exports = {
    loadRegister,
    register,
    loadLogin,
    login,
    logout,
    loadDashboard
}