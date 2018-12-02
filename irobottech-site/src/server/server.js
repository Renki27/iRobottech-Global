const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const app = express();
// Settings
app.set("port", process.env.PORT || 8080);

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Routes
app.use('/download',require('../routes/downloadRoutes'));
app.use("/users", require("../routes/Users"));
app.use("/classesR", require("../routes/ClassesR"));
app.use("/RecoverPass", require("../routes/recoverPass"));
app.use("/EditProfileRoute", require("../routes/EditProfileRoute"));
//APP USE LOGIN
app.use("/RegisterCourse", require("../routes/RegisterCourseRoute"));
app.use("/RegisterGroup", require("../routes/RegisterGroupRoute"));
app.use("/RegisterPerson", require("../routes/RegisterPersonRoute"));
app.use("/RegisterSchedule", require("../routes/RegisterScheduleRoute"));
app.use("/ShowAccounts",  require("../routes/AccountsRoute"));
app.use("/upload",require("../routes/uploadRoute"));
app.use("/files",require( "../routes/files"));

// Static Files
app.use(express.static("dist"));
//app.use(express.static(path.join(__dirname, '../../public')));

module.exports = app;
