import { Router } from "express";
import passport from "passport";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

const router = Router();

router.get('/google',passport.authenticate('google', {session: false, scope: [ 'profile', 'email' ] }));

router.get('/google/callback', passport.authenticate('google', { session: false, failureRedirect: '/' }), async (req,res)=> {
    try {
        const { id, displayName, emails, photos } = req.user;
        let user = await userModel.findOne({ googleID });

        if(!user){
            user = new userModel({
                googleID:id,
                email:emails[0].value,
                name:displayName,
                avatar: photos[0].value
            });
            await user.save();
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, { httpOnly: true });
        res.redirect('/')
    } catch (error) {
        console.error('Error during Google authentication:',error);
        res.redirect('/')
    }
})

export default router;