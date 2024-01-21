const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'poster') {
            cb(null, 'uploads/posters/');
        } else if (file.fieldname === 'bookFile') {
            cb(null, 'uploads/files/');
        } else {
            cb(new Error('Invalid fieldname'));
        }
    },
    filename: function (req, file, cb) {
        const uniqueFileName = `${Date.now()}-${file.originalname}`;
        req[file.fieldname + 'FileName'] = uniqueFileName;
        cb(null, uniqueFileName);
    },
    limits: {
        fileSize: 1024 * 1024 * 100, // 100 MB limit
    },
});

const upload = multer({ storage: storage }).fields([
    { name: 'poster', maxCount: 1 },
    { name: 'bookFile', maxCount: 1 },
]);

module.exports = { upload };