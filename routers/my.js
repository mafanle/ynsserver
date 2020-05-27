const express = require('express')
const router = express.Router()
var pool = require('../pool')
var query = require('./query')

router.get('/my', (req, res) => {
    var yid = req.query.id
    console.log(yid);
    
    var count = 12
    var start = (req.query.page - 1) * count
    var  output = {}
    var sql = 'select usersigna from yns_user where yid=? '
      query(sql, [yid])
    .then(result => {
        output.signa=result
        var sql = ' select * from yns_trends inner join yns_user on userYid =yns_user.yid where userYid = ? order by trendsTime DEsc LIMIT ?,?;'
     return query(sql,[yid,start,count])
    }).then(result=>{
       output.neirong = result;
       res.send(output)
    })
    .catch(error=>{
       console.log(error);
    });
    
})
router.get('/myjiazai',(req,res)=>{
   var yid = req.query.id
   var count = 12
   var start = (req.query.page - 1) * count
   var sql = ' select * from yns_trends inner join yns_user on userYid =yns_user.yid where userYid = ? order by trendsTime DEsc LIMIT ?,?;'
   pool.query(sql, [yid,start, count], (err, result) => {
      if (result.length == 0) {
          res.send({
              "code": 0
          })
      } else {
          res.send(result)
      }
  })
})

router.get('/xiugai', function (req, res) {
    var qianming = req.query.qianming
    var yid = req.query.yid
    var sql = 'UPDATE yns_user SET usersigna=? WHERE yid=? '
    pool.query(sql, [qianming, yid], (err, result) => {
        if (err) throw err
        console.log(result);
        if (result.affectedRows > 0) {
            res.send('1')
        } else {
            res.send('0')
        }

    })
})

module.exports = router