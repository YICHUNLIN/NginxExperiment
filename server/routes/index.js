var express = require('express');
var router = express.Router();
const selfName = process.env.name;
//var sleep = require('sleep');
router.get('/plus/a/:a/b/:b', (req, res) => {
  const result = parseFloat(req.params.a) + parseFloat(req.params.b);
  return res.status(200).json({ message: `a + b = ${result}`, from: selfName});
});


module.exports = router;
