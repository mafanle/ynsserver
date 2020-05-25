const express = require('express')
const pool = require('../pool')
const router = express.Router()
const multer = require('multer')
const uuid = require('uuid')



var path = 'upload/'
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path)
    },
    filename: function (req, file, cb) {
        var origin = file.originalname;
        var extension = origin.substr(origin.lastIndexOf('.') + 1);
        extension = extension.toLowerCase();
        var main = uuid.v1();
        filename = main + '.' + extension
        cb(null, filename)
    }
})
var upload = multer({
    storage: storage
})

router.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.query.id);
    var yid  = req.query.id
    var file = 'http://127.0.0.1:4000/' + req.file.path.substr(req.file.path.lastIndexOf('\\') + 1);
    var sql = 'UPDATE yns_user SET userimg=? WHERE yid=? '
    pool.query(sql, [file, yid], (err, result) => {
        if (err) throw err
        console.log(result);
        if (result.affectedRows > 0) {
           var sql = 'select userimg from yns_user where yid = ?'
           pool.query(sql,[yid],(err,result)=>{
              
               if (err) throw err
                res.send(result)
           })
        } else {
            res.send('0')
        }

    })
})


module.exports = router