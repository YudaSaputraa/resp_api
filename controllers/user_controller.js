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
            .badge {
              display: inline-block;
              padding: 5px 10px;
              border-radius: 12px;
              color: white;
              font-size: 12px;
              font-weight: bold;
            }
            .get {
              background-color: #4caf50;
            }
            .post {
              background-color: #2196f3;
            }
            .put {
              background-color: #ff9800;
            }
            .delete {
              background-color: #f44336;
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
                <td><span class="badge get">GET</span></td>
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
                <td><span class="badge post">POST</span></td>
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
                <td><span class="badge put">PUT</span></td>
                <td>/user/:id</td>
                <td>Untuk mengedit data user berdasarkan id</td>
                <td>
                  <pre>{
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
  
              <tr>
                <td><span class="badge delete">DELETE</span></td>
                <td>/user/:id</td>
                <td>Menghapus user berdasarkan ID</td>
                <td>-</td>
                <td>
                  <pre>{
    "status": "success",
    "message": "deletes success"
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

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                status: "error",
                message: "Invalid email format"
            });
        }
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

        if (!email || !password || !phone_number) {
            return res.status(400).json({
                status: "error",
                message: "All fields (email, password, phone_number) are required and cannot be empty."
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                status: "error",
                message: "Invalid email format"
            });
        }

        const register = await users.create({
            email: email,
            password: password,
            phone_number: phone_number
        });
        res.status(201).json({
            status: "success",
            message : "register success"
        });
    } catch (error) {
        console.log(`Error : ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { password, phone_number } = req.body;
        
        let updatedData = {
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
        res.status(201).json({
            status: "success",
            message: "updated success",
            updatedUser
        })
        
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const targetUser = await users.destroy({
            where: {
                id: id
            }
        })
        if (targetUser === 0) {
           return res.status(400).json({
                status: "failed",
                message:"user doesn't exist!"
            })
            
        }
       return res.status(200).json({
            status: "success",
            message:"deletes success"
        })
    } catch (error) {
        console.log(`Error: ${error.message}`);
       return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    initialEnpoint,
    getAllUsers,
    loginHandler,
    registerHandler,
    updateUser,
    deleteUser
};