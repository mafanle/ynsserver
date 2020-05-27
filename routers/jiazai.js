const express = require('express')
const pool = require('../pool')
const router = express.Router()


router.get('/huoqu', function (req, res) {
    var count = 12;
    var start = (req.query.start - 1) * count

    var sql = 'select * from yns_trends inner join yns_user on userYid =yns_user.yid order by trendsTime DESC  LIMIT ?,?'
    pool.query(sql, [start, count], (err, result) => {
        res.send(result)
    })
})

router.get('/jiazai', function (req, res) {
    var count = 12;
    var start = (req.query.start - 1) * count
    var sql = 'select * from yns_trends inner join yns_user on userYid =yns_user.yid order by trendsTime DESC  LIMIT ?,?'
    pool.query(sql, [start, count], (err, result) => {
        console.log(result);

        if (result.length == 0) {
            res.send({
                "code": 0
            })
        } else {
            res.send(result)
        }
    })
})


module.exports = router