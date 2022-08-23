import {Schema, model, models} from 'mongoose';
import validator from 'validator';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as crypto from 'crypto';

const bloggerSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        maxlength: [30, "Name cannot exceed 30 characters"],
        minlength: [3, "Name cannot be less than 3 characters"]
    },
    email: {
        type: String,
        required: [true, "Enter your email"],
        unique: true,
        validate: [validator.isEmail, "Please enter valid email"]
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minlength: [6, "Password cannot be less than 6 characters"],
        select: false
    },
    role:{
        type: String,
        default: "blogger"
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

// To implement a hash password
bloggerSchema.pre("save", async function (next) {
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcryptjs.hash(this.password,10);
})

// for JWT TOKEN
bloggerSchema.methods.getJWTToken = function (){
    return jwt.sign({id: this._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE,  
    })
};

// for Comparing the existing hash password with the user's given password
bloggerSchema.methods.comparePassword = async function (userPassword) {
    return await bcryptjs.compare(userPassword,this.password)
};

//Generating password reset token
bloggerSchema.methods.getResetPasswordToken = function (){
    //Generate token
    const resetToken = crypto.randomBytes(20).toString("hex");
    //Hashing and adding to bloggerSchema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    //Expire the reset token after given time
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
};

const Blogger = models.bloggers || model('bloggers', bloggerSchema);

export default Blogger;