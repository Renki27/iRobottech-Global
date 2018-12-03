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

router.delete("/scheduleD/:numberD/:numberC/:name", (req, res) => {
    Schedule.destroy({ where: {DAY_NUMBER: req.params.numberD, ST_GROUP_NUMBER: req.params.numberC, COURSE_NAME:  req.params.name}})
        .then(result => res.json(result))
});


router.delete("/scheduleAll/:numberC/:name", (req, res) => {
    Schedule.destroy({ where: { ST_GROUP_NUMBER: req.params.numberC, COURSE_NAME:  req.params.name}})
        .then(result => res.json(result))
});

router.put("/scheduleU/:assignedHours/:startTime/:endTime/:numberD/:numberC/:name", (req, res) => {
    Schedule.update({ASSIGNED_HOURS: req.params.assignedHours, START_TIME: req.params.startTime, END_TIME: req.params.endTime},
        {where:{DAY_NUMBER: req.params.numberD, ST_GROUP_NUMBER: req.params.numberC, COURSE_NAME:  req.params.name}})
        .then(result => res.json(result))
});

module.exports = router;