const express = require('express')
const router = express.Router()
var query = require('./query')

router.get('/my/:id', (req, res) => {
    var yid = req.params.id
    var  output = {}
    var sql = 'select usersigna from yns_user where yid=? '
      query(sql, [yid])
    .then(result => {
        output.signa=result
        var sql = 'select * from yns_trends inner join yns_user on userYid =yns_user.yid where userYid =?'
     return query(sql,[yid])
    }).then(result=>{
       output.neirong = result;
       console.log(output);
       res.send(output)
    })
    .catch(error=>{
       console.log(error);
       
    });
    
})


module.exports = router