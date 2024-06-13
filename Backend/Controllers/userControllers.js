import asyncHandler from 'express-async-handler';
import User from '../Models/userModel.js';
import generateToken from '../Utils/generateToken.js';

// @desc  Auth user/set token
// route  POST /api/users/auth
// @access   Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(400);
        throw new Error('Invald email or password');
    }
});


// @desc  Register a new user
// route  POST /api/users
// @access   Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password,
        isAdmin: false,
    });

    if (user) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(400);
        throw new Error('Invalud user data');
    }
});

// @desc  Logout user
// route  POST /api/users/logout
// @access   Public
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({ message: 'User logged out' });
});

// @desc  Get user profile
// route  GET /api/users/profile
// @access   Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        isAdmin: req.user.isAdmin,
    }

    res.status(200).json(user);
});



// @desc  Update user profile
// route  PUT /api/users/profile
// @access   Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { name, email, password } = req.body;

    console.log('updated request recieved', { userId, name, email, password });
    console.log('Request body:', req.body);

    const user = await User.findById(userId);
    console.log("user is:", user);

    if (user) {
        user.name = name || user.name;
        user.email = email || user.email;

        if (password) {
            user.password = password;
        }

        if (req.body.profileImage) {
            user.profileImage = req.body.profileImage;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            profileImage: updatedUser.profileImage,
            isAdmin: updateUserProfile.isAdmin,
        });

    } else {
        res.status(404);
        throw new Error('User not found');
    }

});

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
}