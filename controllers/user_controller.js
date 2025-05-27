const express = require('express');
const router = express.Router();
const users = require('../models/user_model');
const { where } = require('sequelize');

const initialEnpoint = async (req, res) => {
    res.status(200).json({
        status: "success",
        message : "connected!",
    })
}

const getAllUsers = async (req, res) => {
    try {
        const user = await users.findAll();
        res.status(200).json({
            status: "success",
            message: "successfully fetch all users",
            data : user
        })
        
    } catch (error) {
        console.log(`error : ${error.message}`)
        
    }
}

const loginHandler = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userAccount = await users.findOne({
            where: {
                email: email
            }
        })
        res.status(200).json({
            status: "success",
            message: "login success!",
            data:userAccount
        })
    } catch (error) {
        res.status(error.statusCode || 500).json({
            status: "Error",
            message:error.message
        })
        
    }
}

const registerHandler = async (req, res) => {
    try {
        const { email, password, phone_number } = req.body;
        const register = await users.create({
            email: email,
            password: password,
            phone_number: phone_number
        });
        res.status(200).json({
            status: "success",
            message : "register successfully"
        })
    } catch (error) {
        console.log(`Error : ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, password, phone_number } = req.body;
        
        let updatedData = {
            email,
            password: password,
            phone_number: phone_number,
        };
        
        const result = await users.update(updatedData, {
            where: {
                id: id
            }
        });

        if (result[0] === 0) {
            return res.status(404).json({
                status: "failed",
                message : "not found or no changes applied!"
            })
        }

        const updatedUser = await users.findByPk(id);
        res.status(200).json({
            status: "success",
            message: "updated successfully",
            updatedUser
        })
        
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    initialEnpoint,
    getAllUsers,
    loginHandler,
    registerHandler,
    updateUser
};