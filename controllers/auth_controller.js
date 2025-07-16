const express = require('express');
const users = require('../models/user_model');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
const { where } = require('sequelize');

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username, !email, !password) {
            return res.status(400).json({
                status: false,
                message:"All fields (username, email, password) are required and cannot be empty."
            })
        }
        const encryptedPassword = bcrypt.hashSync(password, 10);

        const registerUser = await users.create({
            username,
            email,
            password : encryptedPassword
        });
        res.status(201).json({
            status: true,
            message: "Register successfull.",
        });
        
    } catch (error) {
    console.log(`Error : ${error.message}`);
    res.status(500).json({ message: 'Internal server error' });
        
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await users.findOne({
            where: {
                email:email
            }
        });
        if (!user) {
            return res.status(401).json({
                status: false,
                message: "User not found!",
            });
            
        }

        const valid = bcrypt.compareSync(password, user.password);
        if (!valid) {
            return res.status(401).json({
                 status: false,
                message: "Invalid password!",
            })
        };

        const token = jwt.sign({
            id: user.id,
            email: user.email
        }, SECRET_KEY, {
            expiresIn: '1h',
        })
        res.json({
            status: true,
            message: "login success!",
            token: token
        })

    } catch (error) {
           console.log(`Error : ${error.message}`);
    res.status(500).json({ message: 'Internal server error' });
    }
}

const profile = async (req, res) => {
    res.status(200).json({
        status: true,
        message: "sucessfully fetch profile",
        data : req.user
    })
}

module.exports = {
    register,
    login,
    profile
}