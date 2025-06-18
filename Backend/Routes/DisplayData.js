let express = require("express");
let router = express.Router();

router.post("/foundData", (req, res) => {
  try {
    res.send(global.foodData);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
