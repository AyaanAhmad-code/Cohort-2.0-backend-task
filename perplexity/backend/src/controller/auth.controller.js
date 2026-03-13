import userModel from "../models/user.model.js"
import jwt from "jsonwebtoken"
import { sendEmail } from "../services/mail.service.js"
import "dotenv/config"

/**
 * @desc Register a new user
 * @route POST /api/auth/register
 * @access Public
 * @body { username, email, password }
 */
export async function register(req,res){

    const {username,email,password} = req.body;

    const isUserAlreadyExist = await userModel.findOne({
        $or:[
            {email},{username}
        ]
    })

    if(isUserAlreadyExist){
        return res.status(400).json({
            message: "user with this email or username already exist",
            success: false,
            err: "user already exists"
        })
    }

    const user = await userModel.create({
        username,
        email,
        password
    })

    const emailVerificationToken = jwt.sign({
        email: user.email,
    },process.env.JWT_SECRET)

    await sendEmail({
        to: email,
        subject: "welcome to perplexity",
        html: `
                <p>Hi ${username},</p>
                <p>Thank you for registering at <strong>Perplexity</strong>. We're excited to have you on board!</p>
                <p>Please verify your email address by clicking the link below:</p>
                <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">Verify Email</a>
                <p>Best regards,<br>The Perplexity Team</p>
        `
    })

    res.status(201).json({
        message: "User registered successfully",
        success: true,
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
}

/**
 * @desc Login user and return JWT token
 * @route POST /api/auth/login
 * @access Public
 * @body { email, password }
 */
export async function login(req,res){
    const { email,password } = req.body;

    const user = await userModel.findOne({ email })

    if(!user){
        return res.status(400).json({
            message: "Invalid email or password",
            success: false,
            err: "User not found"
        })
    }

    const isPasswordMatch = await user.comparePassword(password)

    if(!isPasswordMatch){
        return res.status(400).json({
            message: "Invalid email or password",
            success: false,
            err: "Incorrect password"
        })
    }

    if(!user.verified){
        return res.status(400).json({
            message: "Please verify your email before logging in",
            success: false,
            err: "Email not verified"
        })
    }

    const token = jwt.sign({
        id: user._id,
        username: user.username,
    },process.env.JWT_SECRET,{ expiresIn: "7d"})

    res.cookie("token",token)

    res.status(200).json({
        message: "Login successful",
        success: true,
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

/**
 * @desc Get current logged in user's details
 * @route GET /api/auth/get-me
 * @access Private
 */
export async function getMe(req,res){
    const userId = req.user.id;

    const user = await userModel.findById(userId).select("-password");

    if (!user) {
        return res.status(404).json({
            message: "User not found",
            success: false,
            err: "User not found"
        })
    }

    res.status(200).json({
        message: "User details fetched successfully",
        success: true,
        user
    })
}

/**
 * @desc Verify user's email address
 * @route GET /api/auth/verify-email
 * @access Public
 * @query { token }
 */
export async function verifyEmail(req,res){
    const { token } = req.query;

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        const user = await userModel.findOne({ email: decoded.email });

        if(!user){
            return res.status(400).json({
                message: "Invalid token",
                success: false,
                err: "User not found"
            })
        }

        if(user.verified){
            const html = `
            <h1>Your email is already verified</h1>
            <P>You can proceed to login.</P>
            <a href="http://localhost:3000/login">Go to Login</a>
            `
            return res.send(html)
        }

        user.verified = true;

        await user.save();

        const html =
            `
        <h1>Email Verified Successfully!</h1>
        <p>Your email has been verified. You can now log in to your account.</p>
        <a href="http://localhost:3000/login">Go to Login</a>
    `

        return res.send(html);
    } catch (err) {
        return res.status(400).json({
            message: "Invalid or expired token",
            success: false,
            err: err.message
        })
    }
}

/**
 * @desc    Resend verification email to a user
 * @route   POST /api/auth/resend-verification
 * @access  Public
 * @body    { email }
 */
export async function resendEmail(req, res) {
    const { email } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (user.verified) {
            return res.status(400).json({
                success: false,
                message: "This account is already verified. Please log in"
            });
        }

        const COOLDOWN_TIME = 60 * 1000;
        const currentTime = Date.now();

        if (user.lastEmailSent && (currentTime - user.lastEmailSent < COOLDOWN_TIME)) {
            const timeLeft = Math.ceil((COOLDOWN_TIME - (currentTime - user.lastEmailSent)) / 1000);
            return res.status(429).json({
                success: false,
                message: `Please wait ${timeLeft} seconds before requesting another email.`
            });
        }

        const emailVerificationToken = jwt.sign(
            { email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        await sendEmail({
            to: email,
            subject: "Verify your email - Perplexity",
            html: `
                <p>Hi ${user.username},</p>
                <p>Click the link below to verify your email:</p>
                <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">Verify Email</a>
                <p>This link expires in 1 hour.</p>
            `
        });

        user.lastEmailSent = currentTime;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Verification email sent successfully"
        });

    } catch (error) {
        res.status(400).json({
            message: "Invalid or expired token",
            success: false,
            err: err.message
        });
    }
}