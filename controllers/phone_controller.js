const express = require('express');
const router = express.Router();
const phones = require('../models/phone_model');
const { where } = require('sequelize');

const root = async (req, res) => {
  const html = `
    <html>
      <head>
        <title>API Documentation - Phone</title>
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
        <h1>📱 Phone REST-API Documentation</h1>
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
              <td>/phones</td>
              <td>Menampilkan semua data phone</td>
              <td>-</td>
              <td>
                <pre>{
  "status": "success",
  "message": "successfully fetch all phones",
  "data": [
    {
      "id": 1,
      "name": "Samsung S25 Ultra",
      "brand": "Samsung",
      "price": 20000000,
      "img_url": "https://bim4s4kti.eraspace.com/media/wysiwyg/iphone16/iphone-1.png",
      "specification": "Ram 12GB, storage 512GB, OneUI 14",
      "createdAt": "2025-05-27T16:32:39.000Z",
      "updatedAt": "2025-05-27T16:32:39.000Z"
    }
  ]
}</pre>
              </td>
            </tr>
            <tr>
  <td><span class="badge get">GET</span></td>
  <td>/phone/:id</td>
  <td>Menampilkan phone berdasarkan ID (detail phone)</td>
  <td>-</td>
  <td>
    <pre>{
  "status": "success",
  "message": "Successfully fetched phone by id",
  "data": {
    "id": 6,
    "name": "Samsung Galaxy Z Fold6",
    "brand": "Samsung",
    "price": 32000000,
    "img_url": "https://images.samsung.com/is/image/samsung/p6pim/id/sm-f956bzsdxid/gallery/id-galaxy-z-fold6-f956-514107-sm-f956bzsdxid-thumb-542639724?$216_216_PNG$",
    "specification": "Foldable screen, Snapdragon 8 Gen 3, 12GB RAM",
    "createdAt": "2025-05-27T17:06:18.000Z",
    "updatedAt": "2025-05-27T17:06:18.000Z"
  }
}</pre>
  </td>
</tr>


            <tr>
              <td><span class="badge post">POST</span></td>
              <td>/phone</td>
              <td>Menambahkan phone baru (img_url di-random otomatis)</td>
              <td>
                <pre>{
  "name": "Galaxy S25",
  "brand": "Samsung",
  "price": 15999000,
  "specification": "Snapdragon 8 Gen 3, 12GB RAM, 256GB"
}</pre>
              </td>
              <td>
                <pre>{
  "status": "success",
  "message": "Phone added successfully"
}</pre>
              </td>
            </tr>

            <tr>
              <td><span class="badge put">PUT</span></td>
              <td>/phone/:id</td>
              <td>Mengupdate phone berdasarkan ID (bisa salah satu atau semua field)</td>
              <td>
                <pre>{
  "name": "Galaxy S25",
  "brand": "Samsung",
  "price": 15999000,
  "specification": "Snapdragon 8 Gen 3, 12GB RAM, 256GB"
}</pre>
              </td>
              <td>
                <pre>{
  "status": "success",
  "message": "Phone updated successfully",
  "updatedPhone": {
    "id": 2,
    "name": "Samsung S28 Max",
    "brand": "Sumsang",
    "price": 23000000,
    "img_url": "https://bim4s4kti.eraspace.com/media/wysiwyg/iphone16/iphone-2.png",
    "specification": "Ram 16GB, storage 1TB, OneUI 14",
    "createdAt": "2025-05-27T16:33:58.000Z",
    "updatedAt": "2025-05-27T16:35:03.000Z"
  }
}</pre>
              </td>
            </tr>

            <tr>
              <td><span class="badge delete">DELETE</span></td>
              <td>/phone/:id</td>
              <td>Menghapus phone berdasarkan ID</td>
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
        <h3>Untuk lebih jelasnya bisa cek menggunakan software API testing seperti Postman, dll</h3>
      </body>
    </html>
  `;

  res.send(html);
};




const getAllPhone = async (req, res) => {
  try {
    const phone = await phones.findAll();
    res.status(200).json({
      status: "success",
      message: "successfully fetch all phones",
      data: phone,
      user: req.user
    })

  } catch (error) {
    console.log(`error : ${error.message}`)

  }
}

const getPhoneById = async (req, res) => {
  try {
    const { id } = req.params;
    const phone = await phones.findOne({
      where: { id }
    });

    if (!phone) {
      return res.status(404).json({
        status: "failed",
        message: `Phone with id ${id} not found`
      });
    }

    res.status(200).json({
      status: "success",
      message: "Successfully fetched phone by id",
      data: phone,
      user: req.user
    });

  } catch (error) {
    console.log(`error : ${error.message}`);
    res.status(500).json({
      status: "error",
      message: "Internal server error"
    });
  }
};


const addPhone = async (req, res) => {
  try {
    const { name, brand, price, specification } = req.body;

    if (!name || !brand || !price || !specification) {
      return res.status(400).json({
        status: "error",
        message: "All fields (name, brand, price, specification) are required and cannot be empty."
      });
    }

    if (isNaN(price) || price <= 0) {
      return res.status(400).json({
        status: "error",
        message: "Price must be a valid positive number."
      });
    }

    const imgUrls = [
      "https://images.samsung.com/is/image/samsung/p6pim/id/ps_2504/gallery/id-galaxy-s25-s937-sm-s937bzscxid-thumb-546082587?$216_216_PNG$",
      "https://images.samsung.com/is/image/samsung/p6pim/id/sm-f956bzsdxid/gallery/id-galaxy-z-fold6-f956-514107-sm-f956bzsdxid-thumb-542639724?$216_216_PNG$",
      "https://images.samsung.com/is/image/samsung/p6pim/id/sm-f741bzyaxid/gallery/id-galaxy-zflip6-f741-513509-sm-f741bzyaxid-thumb-542636421?$216_216_PNG$",
      "https://images.samsung.com/is/image/samsung/p6pim/id/sm-a566blitxid/gallery/id-galaxy-a56-5g-sm-a566-sm-a566blitxid-thumb-545367485?$216_216_PNG$",
      "https://bim4s4kti.eraspace.com/media/wysiwyg/iphone16/iphone-1.png",
      "https://bim4s4kti.eraspace.com/media/wysiwyg/iphone16/iphone-2.png",
      "https://bim4s4kti.eraspace.com/media/wysiwyg/iphone16/iphone-5.png",
      "https://cdnpro.eraspace.com/media/catalog/product/a/p/apple_iphone_15_black_1_1.jpg",
      "https://image01.realme.net/general/20250522/1747889587883d2a3be1075bc4df1a749dfcdd17fdc1b.png.webp?width=1080&height=1080&size=932246",
      "https://image01.realme.net/general/20250522/17478892761986a7207924f9449b59872dd5a19aed71c.png.webp?width=1080&height=1080&size=866353",
      "https://down-id.img.susercontent.com/file/971a01ad3bb812bdc018452ae53dd5f9",
      "https://cms.dailysocial.id/wp-content/uploads/2015/07/nokia-3315.jpg"
    ];

    const randomImgUrl = imgUrls[Math.floor(Math.random() * imgUrls.length)];

    const newPhone = await phones.create({
      name,
      brand,
      price,
      img_url: randomImgUrl,
      specification
    });

    res.status(201).json({
      status: "success",
      message: "Phone successfully added.",
      data: newPhone,
      user: req.user
    });
  } catch (error) {
    console.log(`Error : ${error.message}`);
    res.status(500).json({ message: 'Internal server error' });
  }
}



const updatePhone = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, brand, price, specification } = req.body;

    // Cek apakah ada data yang dikirim
    if (!name && !brand && !price && !specification) {
      return res.status(400).json({
        status: "error",
        message: "At least one field (name, brand, price, specification) must be provided for update."
      });
    }

    let updatedData = {};
    if (name) updatedData.name = name;
    if (brand) updatedData.brand = brand;
    if (price) {
      if (isNaN(price) || price <= 0) {
        return res.status(400).json({
          status: "error",
          message: "Price must be a valid positive number."
        });
      }
      updatedData.price = price;
    }
    if (specification) updatedData.specification = specification;

    const result = await phones.update(updatedData, {
      where: { id: id }
    });

    if (result[0] === 0) {
      return res.status(404).json({
        status: "failed",
        message: "Phone not found or no changes applied!"
      });
    }

    const updatedPhone = await phones.findByPk(id);

    res.status(200).json({
      status: "success",
      message: "Phone updated successfully",
      data: updatedPhone,
      user: req.user
    });

  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(500).json({ message: 'Internal server error' });
  }
}


const deletePhone = async (req, res) => {
  try {
    const { id } = req.params;

    const targetPhone = await phones.destroy({
      where: {
        id: id
      }
    });

    if (targetPhone === 0) {
      return res.status(404).json({
        status: "failed",
        message: "Phone doesn't exist!"
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Phone deleted successfully",
      user: req.user
    });

  } catch (error) {
    console.log(`Error: ${error.message}`);
    return res.status(500).json({ message: 'Internal server error' });
  }
}


module.exports = {
  root,
  getAllPhone,
  getPhoneById,
  addPhone,
  updatePhone,
  deletePhone
};