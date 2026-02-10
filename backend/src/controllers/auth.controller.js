const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateCode = require("../utils/generateReferralCode");
const { isValidEmail, isValidPassword } = require("../utils/validators");


exports.signup = async (req, res) => {
    const { name, email, password, referralCode } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (!isValidEmail(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    if (!isValidPassword(password)) {
        return res
            .status(400)
            .json({ message: "Password must be at least 5 characters" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
    }


    const hashedPassword = await bcrypt.hash(password, 10);
    const userReferralCode = generateCode();

    let referredByUser = null;

    if (referralCode && referralCode.trim() !== "") {

        referredByUser = await User.findOne({ referralCode });

        if (!referredByUser)
            return res.status(400).json({ message: "Invalid referral code" });

        if (referredByUser.directReferrals.length >= 8)
            return res.status(400).json({ message: "Referral limit reached" });
    }

    const generateUserNumber = () => {
        return Math.floor(100000 + Math.random() * 900000); // 6 digit
    };


    const user = await User.create({
        userNumber: generateUserNumber(),
        name,
        email,
        password: hashedPassword,
        referralCode: userReferralCode,
        referredBy: referredByUser?._id
    });

    if (referredByUser) {
        referredByUser.directReferrals.push(user._id);
        await referredByUser.save();
    }

    res.json({ message: "Signup successful" });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    if (!isValidEmail(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    if (!isValidPassword(password)) {
        return res
            .status(400)
            .json({ message: "Password must be at least 5 characters" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Wrong password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ token });
};
