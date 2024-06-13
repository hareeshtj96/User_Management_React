import asyncHandler from "express-async-handler";
import User from '../Models/userModel.js'
import generateToken from "../Utils/generateToken.js";



// @desc Auth admin/set token
// @route POST /api/admins/auth
// @access Public
const authAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const admin = await User.findOne({ email, isAdmin: true });
    console.log(admin);

    if (admin && (await admin.matchPassword(password))) {
        const token = generateToken(res, admin._id);
        res.status(201).json({
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            isAdmin: admin.isAdmin,
            token,
        });
    } else {
        res.status(400);
        throw new Error('invalid email or password');
    }
});


// @desc logout admin

const logoutAdmin = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Admin logged out' });
})

const userlist = async (req, res) => {
    try {
        let users = await User.find();
        users = users.filter(user => !user.isAdmin);

        res.json({ users: users });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Error retrieving users' });
    }
};


const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        console.log(name);

        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400);
            throw new Error('User already exists');
        }

        const user = await User.create({
            name,
            email,
            password,
            isAdmin: false
        });


        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
            })
        }
    } catch (err) {
        console.log(err.message);
        res.status(401);
        throw new Error('User creation failed');
    }
}


const updateUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.userId)
        const { name, email } = req.body;
        if (user) {
            user.name = name || user.name;
            user.email = email || user.email
            await user.save();
        }
        res.json({
            name: user.name,
            email: user.email
        })
    } catch (err) {
        console.log(err.message);
        res.status(401);
        throw new Error('User updation failed');
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);

        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }

        await User.findByIdAndDelete(req.params.userId);

        res.status(200).json({ message: 'user deleted successfully' });
    } catch (err) {
        console.log(err.message);
        res.status(401).json({ message: 'user deletion failed' });
    }
}



export {
    authAdmin,
    logoutAdmin,
    userlist,
    createUser,
    updateUser,
    deleteUser,
}