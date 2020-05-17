const express = require('express')
const pool = require('../pool')
const router = express.Router()
router.post('/login',function (req,res) {
    let username = req.body.username
    let password = req.body.password
    console.log(username);
    
    var sql = 'select * From yns_user WHERE username=? AND upassword=?';
 
     pool.query(sql,[username,password],(err,result)=>{
         if (err) throw err
         console.log(result);
         
         if (result.length == 0) {
             res.send({
                 msg:'登录失败',
                 code:0
             })
         }else{
             res.send({
               result
             })
         }
     })
 })
 router.post('/reg',function (req,res) {
    var username = req.body.username
    var password = req.body.password  
    var sql = 'select count(yid) as count from yns_user where username=?';
    pool.query(sql, [username], (err, result) => {
        if (err) throw err;
        var count = result[0].count;
        if (count == 1) {
            res.send({
                msg: '注册失败',
                code: 0
            })
        } else {
            var sql = 'insert into yns_user(username,upassword) values(?,?)';
            pool.query(sql, [username, password], (err, result) => {
                if (err) throw err;
                res.send({
                    meg: '用户注册成功',
                    code: 1
                })
            })
        }

    })
})

 module.exports = router