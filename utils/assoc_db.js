const phone = require("../models/phone_model");
const my_db = require("./db");

const dummyPhoneData = [
    {
      "name": "Nokia 3310",
      "brand": "Nokia",
      "price": 500000,
      "specification": "Classic phone, long battery life",
      "img_url": "https://cms.dailysocial.id/wp-content/uploads/2015/07/nokia-3315.jpg"
    },
    {
      "name": "Nokia 1100",
      "brand": "Nokia",
      "price": 400000,
      "specification": "Durable, simple UI, flashlight",
      "img_url": "https://down-id.img.susercontent.com/file/971a01ad3bb812bdc018452ae53dd5f9"
    },
    {
      "name": "Samsung Galaxy S25 Ultra",
      "brand": "Samsung",
      "price": 20000000,
      "specification": "Ram 12GB, storage 512GB, OneUI 14",
      "img_url": "https://images.samsung.com/is/image/samsung/p6pim/id/ps_2504/gallery/id-galaxy-s25-s937-sm-s937bzscxid-thumb-546082587?$216_216_PNG$"
    },
    {
      "name": "Samsung Galaxy Z Fold6",
      "brand": "Samsung",
      "price": 32000000,
      "specification": "Foldable screen, Snapdragon 8 Gen 3, 12GB RAM",
      "img_url": "https://images.samsung.com/is/image/samsung/p6pim/id/sm-f956bzsdxid/gallery/id-galaxy-z-fold6-f956-514107-sm-f956bzsdxid-thumb-542639724?$216_216_PNG$"
    },
    {
      "name": "Samsung Galaxy A56",
      "brand": "Samsung",
      "price": 5500000,
      "specification": "Mid-range, 5G support, 64MP camera",
      "img_url": "https://images.samsung.com/is/image/samsung/p6pim/id/sm-a566blitxid/gallery/id-galaxy-a56-5g-sm-a566-sm-a566blitxid-thumb-545367485?$216_216_PNG$"
    },
    {
      "name": "Realme GT Neo 5",
      "brand": "Realme",
      "price": 7000000,
      "specification": "Snapdragon 8+ Gen 1, 12GB RAM, 120Hz AMOLED",
      "img_url": "https://image01.realme.net/general/20250522/1747889587883d2a3be1075bc4df1a749dfcdd17fdc1b.png.webp?width=1080&height=1080&size=932246"
    },
    {
      "name": "Realme Narzo 70",
      "brand": "Realme",
      "price": 2300000,
      "specification": "MediaTek Helio G96, 4GB RAM, 90Hz display",
      "img_url": "https://image01.realme.net/general/20250522/17478892761986a7207924f9449b59872dd5a19aed71c.png.webp?width=1080&height=1080&size=866353"
    },
    {
      "name": "iPhone 15 Pro",
      "brand": "Apple",
      "price": 22000000,
      "specification": "A17 Bionic, 8GB RAM, ProMotion display",
      "img_url": "https://bim4s4kti.eraspace.com/media/wysiwyg/iphone16/iphone-1.png"
    },
    {
      "name": "iPhone 14",
      "brand": "Apple",
      "price": 15000000,
      "specification": "A15 Bionic, 6GB RAM, dual camera",
      "img_url": "https://bim4s4kti.eraspace.com/media/wysiwyg/iphone16/iphone-2.png"
    },
    {
      "name": "Xiaomi Redmi Note 12",
      "brand": "Xiaomi",
      "price": 4500000,
      "specification": "Snapdragon 4 Gen 1, 6GB RAM, AMOLED display",
      "img_url": "https://down-id.img.susercontent.com/file/971a01ad3bb812bdc018452ae53dd5f9"
    },
    {
      "name": "Xiaomi Poco X5 Pro",
      "brand": "Xiaomi",
      "price": 6500000,
      "specification": "Snapdragon 778G, 8GB RAM, 120Hz AMOLED",
      "img_url": "https://down-id.img.susercontent.com/file/971a01ad3bb812bdc018452ae53dd5f9"
    },
    {
      "name": "Nokia 6300",
      "brand": "Nokia",
      "price": 700000,
      "specification": "Classic feature phone, 2MP camera",
      "img_url": "https://cms.dailysocial.id/wp-content/uploads/2015/07/nokia-3315.jpg"
    },
    {
      "name": "Samsung Galaxy Z Flip6",
      "brand": "Samsung",
      "price": 24000000,
      "specification": "Compact foldable, Snapdragon 8 Gen 2, 8GB RAM",
      "img_url": "https://images.samsung.com/is/image/samsung/p6pim/id/sm-f741bzyaxid/gallery/id-galaxy-zflip6-f741-513509-sm-f741bzyaxid-thumb-542636421?$216_216_PNG$"
    },
    {
      "name": "Realme 11 Pro",
      "brand": "Realme",
      "price": 5000000,
      "specification": "Dimensity 7050+, 8GB RAM, 100W fast charging",
      "img_url": "https://image01.realme.net/general/20250522/1747889587883d2a3be1075bc4df1a749dfcdd17fdc1b.png.webp?width=1080&height=1080&size=932246"
    },
    {
      "name": "iPhone SE (2022)",
      "brand": "Apple",
      "price": 7000000,
      "specification": "A15 Bionic, 4GB RAM, compact size",
      "img_url": "https://bim4s4kti.eraspace.com/media/wysiwyg/iphone16/iphone-5.png"
    }
  ];
  

const assoc = async () => {
    try {
        await my_db.sync({ force: false });
        // phone.bulkCreate(dummyPhoneData);
    } catch (error) {
        console.log(`Error Create : ${error}`);
    }
}

module.exports = assoc;