const express = require('express')
const router = express.Router()
var pool = require('../pool')
var query = require('./query')


router.get('/obtain', (req, res) => {
    var yid = req.query.userid;
    var myid = req.query.myid;
    var output = {}
    var sql = 'select * from yns_user where yid=?'
    query(sql, [yid]).then(result => {
            output.user = result;
            var sql = 'select  * from yns_trends,yns_user  where userYid=yns_user.yid and yns_user.yid = ?'
            return query(sql, [yid])
        }).then(result => {
            output.trends = result;
            var sql = 'select count(*) from yns_follow where bfollid = ?'
            return query(sql, [yid])
        }).then(result => {
            var gz = result[0]
            for (var key in gz) {
                output.gzs = gz[key]
            }
            var sql = 'select * from yns_follow where bfollid = ? and follid = ?'
            return query(sql, [yid, myid])
        }).then(result => {
            if (result.length == 0) {
                output.gz = false
            } else {
                output.gz = true
            }
            res.send(output)
        })
        .catch(error => {
            console.log();
        })
})
router.get('/qxgz', (req, res) => {
    var myid = req.query.myid
    var yid = req.query.userid
    console.log(myid, yid);
    // res.send({
    //     "msg": '删除成功',
    //     "code": 1
    // })
    var sql = 'delete from yns_follow where bfollid=? and follid = ? '
    pool.query(sql, [yid, myid], (err, result) => {
        if (err) throw err
        console.log(result);
        if (result.affectedRows > 0) {
            res.send({
                "msg": '删除成功',
                "code": 1
            })
        } else {
            res.send({
                "msg": '删除失败',
                "code": 0
            })
        }
    })
})
router.get('/gz', (req, res) => {
    var myid = req.query.myid
    var yid = req.query.userid
    // res.send({
    //     "msg": '关注成功',
    //     "code": 1
    // })
    var sql = "insert into yns_follow(bfollid,follid)values(?,?)"
    pool.query(sql, [yid, myid], (err, result) => {
        if (err) throw err
        console.log(result);
        if (result.affectedRows > 0) {
            res.send({
                "msg": '关注成功',
                "code": 1
            })
        } else {
            res.send({
                "msg": '关注失败',
                "code": 0
            })
        }
    })
})
module.exports = router