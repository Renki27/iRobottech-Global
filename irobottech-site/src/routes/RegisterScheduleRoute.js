const express = require("express");
const router = express.Router();
const cors = require("cors");
const Schedule = require("../models/Schedule");
router.use(cors());
process.env.SECRET_KEY = "secret";



router.post("/", (req, res) => {
    Schedule.create(req.body)
        .then(result => res.json(result))
});

module.exports = router;