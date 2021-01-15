var express = require("express");
const db = require("./db");
var router = express.Router();

router.get("/", function (req, res, next) {
    db.getInfo().then((resp) => {
        // console.log(resp.rows);
        res.json(resp.rows);
    });
});

module.exports = router;
