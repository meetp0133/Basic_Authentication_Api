const multer = require('multer');
const path = require("path")

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname,"../../public/user"))
    },
    filename: function (req, file, cb) {

        cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

exports.uploadImage = multer({storage:storage})

let productstorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname,"../../public/product"))
    },
    filename: function (req, file, cb) {
        cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});
// module.exports = storage
exports.uploadProduct = multer({storage:productstorage})

let categoryImage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname,"../../public/category"))
    },
    filename: function (req, file, cb) {
        cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});
// module.exports = storage
exports.uploadCategory = multer({storage:categoryImage})