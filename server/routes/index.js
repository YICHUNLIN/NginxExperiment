var express = require('express');
var router = express.Router();
const selfName = process.env.name;
router.get('/plus/a/:a/b/:b', (req, res) => {
  return res.status(200).json({ message: `a + b = ${parseFloat(req.params.a) + parseFloat(req.params.b)}`, from: selfName});
});


module.exports = router;
