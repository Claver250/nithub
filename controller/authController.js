const User = require('../models/user');
const {userSchema, loginSchema} = require('../validators/userValidate')
const {hashPassword, comparePassword} = require('../utils/bcrypt');
const { generateToken } = require('../utils/token');
const { error } = require('console');

exports.getUsers = async(req, res) => {
    try {
        const users = await User.find(); 
        res.json(users);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
};

exports.createUser = async (req, res) => {
    try {
        const {error, value} = userSchema.validate(req.body);
        if (error) return res.status(400).json({error : error.message});
        const {name, email, phoneNumber, password, address, dateOfBirth } = value;

        // Check for duplicate email
        const existingUser = await User.findOne({ where: {email} });
        if (existingUser) return res.status(400).json({ error: 'Email already exist'});

        // Hash password using the utils function
        const hashedPassword = await hashPassword(password);

        // Create new user
        const newUser = await User.create({ name,
            email,
            phoneNumber,
            password: hashedPassword, 
            address, 
            dateOfBirth});

        res.status(201).json({
            message: 'User registered successfully',
            user: {id: newUser.userID, name: newUser.name, email: newUser.email}
        });
    }catch(err){
        res.status(500).json({ error : err.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const {error, value} = loginSchema.validate(req.body);
        if(error) return res.status(400).json({ error: error.message});

        const {email, password} = value;

        const user = await User.findOne({ where: {email} });
        if(!user) return res.status(400).json({ error: 'User not found'});

        // Compare password 
        const isMatch = await comparePassword(password, user.password);
        if(!isMatch) return res.status(400).json({ error: 'Invalid details'});

        const token = generateToken(user);
        res.status(200).json({
            message: 'Login successful',
            token,
        });
    } catch(err){
        res.status(500).json({error: err.message});      
    }
};

exports.getProfile = async (req, res) => {
    try{
        const userId = req.user.id;

        const user = await User.findOne({
            where : { userID: userId },
            attributes: ['userID', 'name', 'email', 'createdAt']
        });

        if(!user) {
            return res.status(404).json({error: 'User not found'});
        };
        
        res.json({profile: user })
    }catch(err){
        res.error(500).json({ error: err.message });
    }
};