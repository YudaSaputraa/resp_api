const express = require('express');
const router = express.Router();
const users = require('../models/user_model');
const { where } = require('sequelize');

const initialEnpoint = async (req, res) => {
    const html = `
      <html>
        <head>
          <title>API Documentation</title>
          <style>
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid #333;
              padding: 8px;
              text-align: left;
              vertical-align: top;
            }
            th {
              background-color: #f2f2f2;
            }
            body {
              font-family: sans-serif;
              padding: 20px;
              background-color: #fafafa;
            }
            pre {
              background-color: #f5f5f5;
              padding: 10px;
              border-radius: 5px;
              overflow-x: auto;
            }
          </style>
        </head>
        <body>
          <h1>API Documentation</h1>
          <table>
            <thead>
              <tr>
                <th>Method</th>
                <th>Endpoint</th>
                <th>Description</th>
                <th>Request Body</th>
                <th>Response</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>GET</td>
                <td>/login</td>
                <td>Untuk melakukan login</td>
                <td>
                  <pre>{
    "email": "example@gmail.com",
    "password": "example"
  }</pre>
                </td>
                <td>
                  <pre>{
    "status": "success",
    "message": "login success!",
    "data": {
      "id": 1,
      "email": "tes@gmail.com",
      "password": "tess",
      "phone_number": "34353",
      "createdAt": "2025-05-27T10:55:54.000Z",
      "updatedAt": "2025-05-27T11:10:28.000Z"
    }
  }</pre>
                </td>
              </tr>
  
              <tr>
                <td>POST</td>
                <td>/register</td>
                <td>Mendaftarkan user baru</td>
                <td>
                  <pre>{
    "email": "tes@gmail.com",
    "password": "tess",
    "phone_number": "34353"
  }</pre>
                </td>
                <td>
                  <pre>{
    "status": "success",
    "message": "register successfully"
  }</pre>
                </td>
              </tr>
  
              <tr>
                <td>PUT</td>
                <td>/user/:id</td>
                <td>Untuk mengedit data user berdasarkan id</td>
                <td>
                  <pre>{
    "email": "tes@gmail.com",
    "password": "tess",
    "phone_number": "34353"
  }</pre>
                </td>
                <td>
                  <pre>{
    "status": "success",
    "message": "updated successfully",
    "updatedUser": {
      "id": 1,
      "email": "tes@gmail.com",
      "password": "tess",
      "phone_number": "34353",
      "createdAt": "2025-05-27T10:55:54.000Z",
      "updatedAt": "2025-05-27T11:10:28.000Z"
    }
  }</pre>
                </td>
              </tr>
  
            </tbody>
          </table>
        </body>
      </html>
    `;
  
    res.send(html);
  };
  

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